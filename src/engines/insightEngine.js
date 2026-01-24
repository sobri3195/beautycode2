// Insight Engine - Generates actionable insights from user data

export function generateDailyInsight(userData, todayLog, bodyType) {
  const insights = []
  
  // Sleep insight
  if (todayLog.sleep_hours) {
    const sleepInsight = analyzeSleep(todayLog.sleep_hours, todayLog.sleep_quality, bodyType)
    if (sleepInsight) insights.push(sleepInsight)
  }
  
  // Nutrition insight
  if (todayLog.meals_logged) {
    const nutritionInsight = analyzeNutrition(todayLog, bodyType)
    if (nutritionInsight) insights.push(nutritionInsight)
  }
  
  // Movement insight
  if (todayLog.movement_minutes) {
    const movementInsight = analyzeMovement(todayLog.movement_minutes, todayLog.movement_type, bodyType)
    if (movementInsight) insights.push(movementInsight)
  }
  
  // Energy insight
  if (todayLog.energy_level) {
    const energyInsight = analyzeEnergy(todayLog.energy_level, todayLog, bodyType)
    if (energyInsight) insights.push(energyInsight)
  }
  
  // Pick the most relevant insight
  return insights.length > 0 ? insights[0] : getDefaultInsight(bodyType)
}

function analyzeSleep(hours, quality, bodyType) {
  const typeMessages = {
    red: {
      good: 'Sleep yang cukup membantu insulin sensitivity tetap optimal',
      poor: 'Kurang tidur bisa trigger insulin resistance dan cravings'
    },
    blue: {
      good: 'Quality sleep menurunkan cortisol dan support recovery',
      poor: 'Sleep debt menambah stress load - prioritas recovery malam ini'
    },
    green: {
      good: 'Gut healing optimal terjadi saat Anda tidur cukup',
      poor: 'Kurang tidur meningkatkan inflammatory markers'
    },
    yellow: {
      good: 'Sleep quality support hormonal balance sepanjang cycle',
      poor: 'Lack of sleep worsen hormonal symptoms'
    }
  }
  
  if (hours < 6 || quality === 'poor') {
    return {
      type: 'alert',
      category: 'sleep',
      title: 'Sleep Alert: Recovery Insufficient',
      why: typeMessages[bodyType.primary_body_type]?.poor || typeMessages.blue.poor,
      action: 'Aim untuk tidur 30 menit lebih awal malam ini',
      reminder: 'Sleep is not optional - it\'s your body\'s repair time',
      priority: 'high'
    }
  } else if (hours >= 7 && quality === 'good') {
    return {
      type: 'positive',
      category: 'sleep',
      title: 'Great Sleep! Tubuh dalam optimal state',
      why: typeMessages[bodyType.primary_body_type]?.good || typeMessages.blue.good,
      action: 'Keep this consistency - save apa yang buat tidur bagus',
      reminder: 'Consistency adalah kunci sustainable health',
      priority: 'low'
    }
  }
  
  return null
}

function analyzeNutrition(log, bodyType) {
  const messages = {
    red: {
      title: 'Blood Sugar Pattern',
      why: 'Pola makan Anda directly affect insulin response',
      action: 'Pastikan setiap makan ada protein + serat untuk stable release',
      reminder: 'Small consistent choices > drastic changes'
    },
    blue: {
      title: 'Stress-Eating Check',
      why: 'Irregular eating bisa trigger cortisol spikes',
      action: 'Set meal times yang consistent untuk regulate stress hormone',
      reminder: 'Nourish your nervous system dengan regularity'
    },
    green: {
      title: 'Inflammation Check',
      why: 'Foods yang Anda pilih bisa reduce atau increase inflammation',
      action: 'Track how you feel 2-3 jam setelah makan',
      reminder: 'Your body gives feedback - learn to listen'
    },
    yellow: {
      title: 'Hormonal Nutrition',
      why: 'Nutritional needs change sepanjang cycle',
      action: 'Notice cravings - they often signal apa yang body butuh',
      reminder: 'Honor your cycle, don\'t fight it'
    }
  }
  
  const typeMessage = messages[bodyType.primary_body_type] || messages.red
  
  return {
    type: 'info',
    category: 'nutrition',
    ...typeMessage,
    priority: 'medium'
  }
}

function analyzeMovement(minutes, type, bodyType) {
  const typeAdvice = {
    red: {
      good: 'Movement post-meal adalah salah satu habit terbaik untuk metabolic health',
      low: 'Even 10 menit jalan post-meal bisa improve insulin sensitivity 30%'
    },
    blue: {
      good: 'Movement yang tepat help regulate cortisol naturally',
      low: 'Gentle movement bisa jadi stress relief yang powerful'
    },
    green: {
      good: 'Consistent movement support lymphatic drainage dan reduce inflammation',
      low: 'Low-impact movement masih sangat beneficial untuk gut-immune system'
    },
    yellow: {
      good: 'Movement yang align dengan cycle phase optimize hormonal response',
      low: 'Listen to energy - even gentle stretching counts'
    }
  }
  
  const advice = typeAdvice[bodyType.primary_body_type] || typeAdvice.blue
  
  if (minutes >= 20) {
    return {
      type: 'positive',
      category: 'movement',
      title: 'Movement Goal Hit! 🎉',
      why: advice.good,
      action: 'Notice how you feel - movement should energize, not drain',
      reminder: 'Progress is built one day at a time',
      priority: 'low'
    }
  } else if (minutes < 10) {
    return {
      type: 'reminder',
      category: 'movement',
      title: 'Movement Opportunity',
      why: advice.low,
      action: 'Find 10 menit hari ini untuk light movement',
      reminder: 'Something is always better than nothing',
      priority: 'medium'
    }
  }
  
  return null
}

function analyzeEnergy(energyLevel, log, bodyType) {
  if (energyLevel === 'low' || energyLevel === 'very_low') {
    const possibleReasons = []
    
    if (log.sleep_hours < 7) {
      possibleReasons.push('Sleep insufficient')
    }
    if (log.stress_level === 'high') {
      possibleReasons.push('High stress load')
    }
    if (!log.movement_minutes || log.movement_minutes === 0) {
      possibleReasons.push('No movement today')
    }
    
    return {
      type: 'alert',
      category: 'energy',
      title: 'Low Energy Detected',
      why: `Possible factors: ${possibleReasons.join(', ')}`,
      action: 'Prioritas recovery: hydrate, light meal, short walk, early sleep',
      reminder: 'Low energy adalah signal - listen dan respond kindly',
      priority: 'high'
    }
  }
  
  return null
}

function getDefaultInsight(bodyType) {
  const defaults = {
    red: {
      title: 'Your Daily Focus',
      why: 'Metabolic health dibangun dari small consistent actions',
      action: 'Hari ini: log meals dan notice energy patterns',
      reminder: 'Progress bukan tentang perfect, tapi tentang consistent'
    },
    blue: {
      title: 'Stress Check-In',
      why: 'Managing stress adalah core dari health journey Anda',
      action: 'Take 5 menit untuk breathwork atau journaling hari ini',
      reminder: 'Calm nervous system = healthy body'
    },
    green: {
      title: 'Inflammation Awareness',
      why: 'Healing gut dan reducing inflammation adalah journey, not sprint',
      action: 'Notice: energy, digestion, dan physical comfort hari ini',
      reminder: 'Your body is always communicating - practice listening'
    },
    yellow: {
      title: 'Cycle Awareness',
      why: 'Understanding hormonal patterns memberi Anda control dan compassion',
      action: 'Track cycle phase dan adjust expectations accordingly',
      reminder: 'Honor where you are in your cycle today'
    }
  }
  
  const message = defaults[bodyType.primary_body_type] || defaults.blue
  
  return {
    type: 'info',
    category: 'general',
    ...message,
    priority: 'medium'
  }
}

export function generateWeeklySummary(weekLogs, bodyType) {
  const summary = {
    week_number: getCurrentWeek(),
    total_days: weekLogs.length,
    date_range: {
      start: weekLogs[0]?.date,
      end: weekLogs[weekLogs.length - 1]?.date
    },
    stats: calculateWeeklyStats(weekLogs),
    insights: [],
    wins: [],
    areas_to_improve: [],
    next_week_focus: ''
  }
  
  // Calculate insights
  const sleepConsistency = analyzeSleepConsistency(weekLogs)
  const nutritionPattern = analyzeNutritionPattern(weekLogs)
  const movementTrend = analyzeMovementTrend(weekLogs)
  
  if (sleepConsistency.insight) summary.insights.push(sleepConsistency.insight)
  if (nutritionPattern.insight) summary.insights.push(nutritionPattern.insight)
  if (movementTrend.insight) summary.insights.push(movementTrend.insight)
  
  // Identify wins
  if (sleepConsistency.score >= 80) {
    summary.wins.push('Sleep consistency excellent! 💤')
  }
  if (summary.stats.avg_movement >= 30) {
    summary.wins.push('Movement target consistently hit! 💪')
  }
  if (weekLogs.length >= 6) {
    summary.wins.push('Amazing tracking consistency! 📊')
  }
  
  // Areas to improve
  if (sleepConsistency.score < 60) {
    summary.areas_to_improve.push({
      area: 'Sleep Consistency',
      current: `${sleepConsistency.score}%`,
      target: '80%+',
      suggestion: 'Set consistent bedtime dan wake time'
    })
  }
  
  if (summary.stats.avg_movement < 20) {
    summary.areas_to_improve.push({
      area: 'Daily Movement',
      current: `${Math.round(summary.stats.avg_movement)} min`,
      target: '30+ min',
      suggestion: 'Start dengan 10 menit post-meal walks'
    })
  }
  
  // Next week focus
  summary.next_week_focus = generateNextWeekFocus(summary, bodyType)
  
  return summary
}

function calculateWeeklyStats(logs) {
  const stats = {
    avg_sleep: 0,
    avg_movement: 0,
    avg_energy: 0,
    total_habits_completed: 0,
    days_logged: logs.length
  }
  
  logs.forEach(log => {
    stats.avg_sleep += log.sleep_hours || 0
    stats.avg_movement += log.movement_minutes || 0
    stats.total_habits_completed += log.habits_completed || 0
  })
  
  if (logs.length > 0) {
    stats.avg_sleep = Math.round(stats.avg_sleep / logs.length * 10) / 10
    stats.avg_movement = Math.round(stats.avg_movement / logs.length)
  }
  
  return stats
}

function analyzeSleepConsistency(logs) {
  const sleepTimes = logs.filter(l => l.sleep_hours).map(l => l.sleep_hours)
  if (sleepTimes.length === 0) return { score: 0 }
  
  const avg = sleepTimes.reduce((sum, h) => sum + h, 0) / sleepTimes.length
  const variance = sleepTimes.reduce((sum, h) => sum + Math.abs(h - avg), 0) / sleepTimes.length
  
  const score = Math.max(0, 100 - (variance * 20))
  
  return {
    score: Math.round(score),
    insight: score < 70 ? {
      title: 'Sleep consistency bisa ditingkatkan',
      message: 'Try untuk tidur di waktu yang sama setiap hari',
      impact: 'High - sleep consistency directly affect metabolic dan hormonal health'
    } : null
  }
}

function analyzeNutritionPattern(logs) {
  const mealsLogged = logs.filter(l => l.meals_logged).length
  
  return {
    score: (mealsLogged / logs.length) * 100,
    insight: mealsLogged < 4 ? {
      title: 'Nutrition tracking masih minimal',
      message: 'Consistent logging help identify patterns dan triggers',
      impact: 'Medium - awareness adalah first step to change'
    } : null
  }
}

function analyzeMovementTrend(logs) {
  const movements = logs.filter(l => l.movement_minutes).map(l => l.movement_minutes)
  if (movements.length === 0) return { trend: 'none' }
  
  const avg = movements.reduce((sum, m) => sum + m, 0) / movements.length
  
  return {
    trend: avg >= 30 ? 'excellent' : avg >= 15 ? 'good' : 'needs_improvement',
    insight: avg < 20 ? {
      title: 'Movement bisa lebih konsisten',
      message: 'Even 10-15 menit daily movement has significant benefits',
      impact: 'High - movement adalah key pillar untuk semua body types'
    } : null
  }
}

function generateNextWeekFocus(summary, bodyType) {
  const focuses = {
    red: 'Focus on post-meal movement dan blood sugar stability',
    blue: 'Priority: sleep quality dan stress management',
    green: 'Continue anti-inflammatory nutrition dan gut support',
    yellow: 'Track cycle patterns dan honor hormonal needs'
  }
  
  return focuses[bodyType.primary_body_type] || focuses.blue
}

function getCurrentWeek() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = now - start
  const oneWeek = 1000 * 60 * 60 * 24 * 7
  return Math.ceil(diff / oneWeek)
}
