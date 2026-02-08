const TRACKED_HABITS = ['pola makan', 'tidur', 'emosi', 'aktivitas fisik']

const PLAN_CONFIG = {
  free: {
    trackerDays: 7,
    reminderType: 'basic',
    hasWeeklyInsight: false
  },
  paid: {
    trackerDays: Infinity,
    reminderType: 'adaptive',
    hasWeeklyInsight: true
  }
}

export function getHabitTrackerAccess(habitLogs = [], plan = 'free') {
  const activePlan = PLAN_CONFIG[plan] ? plan : 'free'
  const config = PLAN_CONFIG[activePlan]

  if (config.trackerDays === Infinity) {
    return {
      canLogToday: true,
      trackedHabits: TRACKED_HABITS,
      plan: activePlan,
      daysUsed: habitLogs.length,
      daysRemaining: Infinity,
      message: 'Paid plan aktif: habit tracker tanpa batas.'
    }
  }

  const daysUsed = habitLogs.length
  const daysRemaining = Math.max(0, config.trackerDays - daysUsed)
  const canLogToday = daysRemaining > 0

  return {
    canLogToday,
    trackedHabits: TRACKED_HABITS,
    plan: activePlan,
    daysUsed,
    daysRemaining,
    message: canLogToday
      ? `Free plan: ${daysRemaining} hari tersisa untuk habit tracker.`
      : 'Masa free 7 hari sudah habis. Upgrade ke paid untuk melanjutkan tracking tanpa batas.'
  }
}

export function generateReminder(habitLogs = [], plan = 'free') {
  const activePlan = PLAN_CONFIG[plan] ? plan : 'free'
  const today = new Date().toISOString().split('T')[0]
  const todayLogged = habitLogs.some(log => log.date === today)

  if (todayLogged) {
    return {
      type: 'done',
      message: 'Great job! Kamu sudah check-in hari ini.',
      mode: PLAN_CONFIG[activePlan].reminderType
    }
  }

  if (activePlan === 'paid') {
    const lastLog = habitLogs[habitLogs.length - 1]
    const stressHigh = lastLog?.stress_level === 'high'

    return {
      type: 'adaptive',
      mode: 'adaptive',
      message: stressHigh
        ? 'Reminder adaptif: cek emosi dulu hari ini, lalu tambah aktivitas fisik ringan 10 menit.'
        : 'Reminder adaptif: lanjutkan ritme tidur dan pola makanmu, lalu check-in sebelum jam 21:00.'
    }
  }

  return {
    type: 'basic',
    mode: 'basic',
    message: 'Reminder basic: isi habit tracker hari ini untuk menjaga streak kamu.'
  }
}

export function generateWeeklyRetentionInsight(habitLogs = [], plan = 'free') {
  const activePlan = PLAN_CONFIG[plan] ? plan : 'free'

  if (!PLAN_CONFIG[activePlan].hasWeeklyInsight) {
    return {
      available: false,
      title: 'Insight mingguan tersedia di paket paid',
      message: 'Upgrade untuk melihat insight mingguan dan rekomendasi retensi personal.'
    }
  }

  const weeklyLogs = habitLogs.slice(-7)
  if (weeklyLogs.length === 0) {
    return {
      available: true,
      title: 'Insight Mingguan',
      message: 'Mulai isi tracker harian untuk membuka insight mingguan pertamamu.'
    }
  }

  const avgSleep = weeklyLogs.filter(log => log.sleep_hours).reduce((sum, log) => sum + Number(log.sleep_hours), 0) / (weeklyLogs.filter(log => log.sleep_hours).length || 1)
  const avgMovement = weeklyLogs.filter(log => log.movement_minutes).reduce((sum, log) => sum + Number(log.movement_minutes), 0) / (weeklyLogs.filter(log => log.movement_minutes).length || 1)
  const nutritionRate = Math.round((weeklyLogs.filter(log => log.meals_logged).length / weeklyLogs.length) * 100)

  return {
    available: true,
    title: 'Insight Mingguan',
    message: `Retention score mingguanmu: tidur ${avgSleep.toFixed(1)} jam, aktivitas ${Math.round(avgMovement)} menit, pola makan tercatat ${nutritionRate}%. Pertahankan konsistensi untuk return harian dan mingguan.`
  }
}
