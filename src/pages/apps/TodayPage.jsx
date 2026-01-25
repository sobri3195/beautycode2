import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { useHabit } from '../../hooks/useHabit'
import { generateDailyInsight } from '../../engines/insightEngine'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import './TodayPage.css'

export default function TodayPage() {
  const { user, bodyType } = useUser()
  const { dailyHabits, loadTodayHabits, getTodayLog, currentStreak } = useHabit()
  const navigate = useNavigate()
  const todayLog = getTodayLog()
  
  useEffect(() => {
    if (bodyType) {
      loadTodayHabits(bodyType)
    }
  }, [bodyType])
  
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const todayInsight = useMemo(() => {
    if (todayLog && bodyType) {
      return generateDailyInsight(user, todayLog, bodyType)
    }
    return null
  }, [user, bodyType, todayLog])
  const logFields = useMemo(() => ([
    { key: 'sleep_hours', label: 'Sleep hours' },
    { key: 'sleep_quality', label: 'Sleep quality' },
    { key: 'energy_level', label: 'Energy level' },
    { key: 'movement_minutes', label: 'Movement minutes' },
    { key: 'movement_type', label: 'Movement type' },
    { key: 'stress_level', label: 'Stress level' },
    { key: 'meals_logged', label: 'Nutrition tracking' }
  ]), [])
  const hasValue = useCallback((value) => {
    if (typeof value === 'boolean') return true
    if (value === 0) return true
    if (typeof value === 'number') return !Number.isNaN(value)
    return value !== null && value !== undefined && String(value).trim() !== ''
  }, [])
  const logCompletion = useMemo(() => {
    const total = logFields.length
    if (!todayLog) {
      return {
        filled: 0,
        total,
        percent: 0,
        missing: logFields.map((field) => field.label)
      }
    }
    const missing = []
    let filled = 0
    logFields.forEach((field) => {
      if (hasValue(todayLog[field.key])) {
        filled += 1
      } else {
        missing.push(field.label)
      }
    })
    return {
      filled,
      total,
      percent: Math.round((filled / total) * 100),
      missing
    }
  }, [todayLog, logFields, hasValue])
  const getSleepStat = () => {
    if (!todayLog || !hasValue(todayLog.sleep_hours)) {
      return { value: 'No log', status: 'warning' }
    }
    const hours = Number(todayLog.sleep_hours)
    if (Number.isNaN(hours)) {
      return { value: 'No log', status: 'warning' }
    }
    if (hours >= 7 && todayLog.sleep_quality === 'good') {
      return { value: `${hours}h`, status: 'good' }
    }
    if (hours < 6 || todayLog.sleep_quality === 'poor') {
      return { value: `${hours}h`, status: 'alert' }
    }
    return { value: `${hours}h`, status: 'warning' }
  }
  const getNutritionStat = () => {
    if (!todayLog) {
      return { value: 'No log', status: 'warning' }
    }
    if (todayLog.meals_logged) {
      return { value: 'Logged', status: 'good' }
    }
    return { value: 'Not yet', status: 'warning' }
  }
  const getMovementStat = () => {
    if (!todayLog || !hasValue(todayLog.movement_minutes)) {
      return { value: 'No log', status: 'warning' }
    }
    const minutes = Number(todayLog.movement_minutes)
    if (Number.isNaN(minutes)) {
      return { value: 'No log', status: 'warning' }
    }
    if (minutes >= 20) {
      return { value: `${minutes} min`, status: 'good' }
    }
    if (minutes > 0) {
      return { value: `${minutes} min`, status: 'warning' }
    }
    return { value: '0 min', status: 'alert' }
  }
  const getEnergyStat = () => {
    if (!todayLog || !hasValue(todayLog.energy_level)) {
      return { value: 'No log', status: 'warning' }
    }
    const energyMap = {
      very_low: { value: '1/5', status: 'alert' },
      low: { value: '2/5', status: 'warning' },
      medium: { value: '3/5', status: 'warning' },
      high: { value: '4/5', status: 'good' },
      very_high: { value: '5/5', status: 'good' }
    }
    return energyMap[todayLog.energy_level] || { value: '—', status: 'warning' }
  }
  const sleepStat = getSleepStat()
  const nutritionStat = getNutritionStat()
  const movementStat = getMovementStat()
  const energyStat = getEnergyStat()
  
  return (
    <div className="today-page">
      <div className="today-container">
        {/* Header */}
        <motion.div
          className="today-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Today</h1>
          <p className="today-date">{today}</p>
          {currentStreak > 0 && (
            <div className="streak-badge">
              🔥 {currentStreak} day streak!
            </div>
          )}
        </motion.div>
        
        {/* Body Type Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="body-type-card">
            <div className="body-type-info">
              <span className="body-type-emoji">{bodyType?.primary_info?.emoji}</span>
              <div>
                <div className="body-type-name">{bodyType?.primary_info?.name}</div>
                <div className="body-type-desc">{bodyType?.primary_info?.description}</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Daily Log Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="log-summary-card">
            <div className="log-summary-header">
              <div>
                <h2>Daily Log Progress</h2>
                <p className="log-summary-subtitle">
                  {todayLog ? 'Keep building your wellness story.' : 'Start tracking to unlock personalized insights.'}
                </p>
              </div>
              <span className="log-summary-icon">📝</span>
            </div>

            {todayLog ? (
              <>
                <div className="log-progress">
                  <div className="log-progress-info">
                    <span>{logCompletion.filled}/{logCompletion.total} completed</span>
                    <span>{logCompletion.percent}%</span>
                  </div>
                  <div className="log-progress-bar">
                    <div
                      className="log-progress-fill"
                      style={{ width: `${logCompletion.percent}%` }}
                    />
                  </div>
                </div>

                {logCompletion.missing.length > 0 ? (
                  <div className="log-missing">
                    <p>Next up:</p>
                    <div className="log-missing-tags">
                      {logCompletion.missing.slice(0, 3).map((item) => (
                        <span key={item} className="log-missing-tag">{item}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="log-all-set">
                    ✅ You are all set for today!
                  </div>
                )}
              </>
            ) : (
              <p className="log-summary-empty">
                Belum ada log hari ini. Isi log cepat agar rekomendasi harian lebih akurat.
              </p>
            )}

            <div className="log-summary-actions">
              <Button size="sm" onClick={() => navigate('/apps/log')}>
                {todayLog ? 'Update Log' : 'Start Log'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => navigate('/apps/insight')}
              >
                View Insights
              </Button>
            </div>
          </Card>
        </motion.div>
        
        {/* Today's Focus */}
        {dailyHabits && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="focus-card">
              <div className="focus-header">
                <h2>Today's Focus</h2>
                <span className="focus-emoji">🎯</span>
              </div>
              <p className="focus-message">{dailyHabits.focus_message}</p>
            </Card>
          </motion.div>
        )}
        
        {/* Main Habit */}
        {dailyHabits?.main_habit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <HabitCard
              habit={dailyHabits.main_habit}
              priority="main"
            />
          </motion.div>
        )}
        
        {/* Secondary Habit */}
        {dailyHabits?.secondary_habit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <HabitCard
              habit={dailyHabits.secondary_habit}
              priority="secondary"
            />
          </motion.div>
        )}
        
        {/* Risk/Warning Habit */}
        {dailyHabits?.risk_habit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="risk-card">
              <div className="risk-header">
                <span className="risk-icon">⚠️</span>
                <h3>{dailyHabits.risk_habit.message}</h3>
              </div>
              <p>{dailyHabits.risk_habit.suggestion}</p>
              <Button size="sm" fullWidth>
                {dailyHabits.risk_habit.action}
              </Button>
            </Card>
          </motion.div>
        )}
        
        {/* Daily Insight */}
        {todayInsight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <InsightCard insight={todayInsight} />
          </motion.div>
        )}
        
        {/* Quick Stats */}
        <motion.div
          className="quick-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <StatCard
            icon="😴"
            label="Sleep"
            value={sleepStat.value}
            status={sleepStat.status}
          />
          <StatCard
            icon="🥗"
            label="Nutrition"
            value={nutritionStat.value}
            status={nutritionStat.status}
          />
          <StatCard
            icon="🏃"
            label="Movement"
            value={movementStat.value}
            status={movementStat.status}
          />
          <StatCard
            icon="⚡"
            label="Energy"
            value={energyStat.value}
            status={energyStat.status}
          />
        </motion.div>
      </div>
    </div>
  )
}

function HabitCard({ habit, priority }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <Card className={`habit-card habit-card-${priority}`}>
      <div className="habit-header">
        <div>
          <div className="habit-category">{habit.category}</div>
          <h3 className="habit-title">{habit.title}</h3>
        </div>
        {priority === 'main' && <span className="priority-badge">Main</span>}
      </div>
      
      <p className="habit-description">{habit.description}</p>
      
      {habit.target && (
        <div className="habit-target">
          <span className="target-label">Target:</span>
          <span className="target-value">{habit.target}</span>
        </div>
      )}
      
      {habit.duration && (
        <div className="habit-target">
          <span className="target-label">Duration:</span>
          <span className="target-value">{habit.duration}</span>
        </div>
      )}
      
      {isExpanded && (
        <motion.div
          className="habit-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="habit-why">
            <strong>Why:</strong> {habit.why}
          </div>
          <div className="habit-action">
            <strong>Action:</strong> {habit.action}
          </div>
        </motion.div>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        fullWidth
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show Less' : 'Learn Why'}
      </Button>
    </Card>
  )
}

function InsightCard({ insight }) {
  const getInsightStyle = (type) => {
    const styles = {
      alert: 'insight-alert',
      positive: 'insight-positive',
      reminder: 'insight-reminder',
      info: 'insight-info'
    }
    return styles[type] || styles.info
  }
  
  return (
    <Card className={`insight-card ${getInsightStyle(insight.type)}`}>
      <div className="insight-header">
        <h3>💡 {insight.title}</h3>
      </div>
      <div className="insight-why">
        <strong>Why:</strong> {insight.why}
      </div>
      <div className="insight-action">
        <strong>Action:</strong> {insight.action}
      </div>
      <div className="insight-reminder">
        <em>"{insight.reminder}"</em>
      </div>
    </Card>
  )
}

function StatCard({ icon, label, value, status }) {
  return (
    <Card className="stat-card" padding="sm">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className={`stat-value stat-${status}`}>{value}</div>
    </Card>
  )
}
