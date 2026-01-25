import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../../hooks/useUser'
import { useHabit } from '../../hooks/useHabit'
import { generateDailyInsight } from '../../engines/insightEngine'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import './TodayPage.css'

export default function TodayPage() {
  const { user, bodyType } = useUser()
  const { dailyHabits, loadTodayHabits, getTodayLog, currentStreak, habitLogs } = useHabit()
  const [todayInsight, setTodayInsight] = useState(null)
  const [todayLog, setTodayLog] = useState(null)
  
  useEffect(() => {
    if (bodyType) {
      loadTodayHabits(bodyType)
    }
  }, [bodyType])
  
  useEffect(() => {
    const todayLog = getTodayLog()
    if (todayLog && bodyType) {
      const insight = generateDailyInsight(user, todayLog, bodyType)
      setTodayInsight(insight)
    }
  }, [user, bodyType, habitLogs])

  useEffect(() => {
    setTodayLog(getTodayLog())
  }, [habitLogs])
  
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
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
            value={todayLog?.sleep_hours ? `${todayLog.sleep_hours}h` : 'Not logged'}
            status={todayLog?.sleep_hours >= 7 ? 'good' : 'neutral'}
          />
          <StatCard
            icon="💧"
            label="Hydration"
            value={todayLog?.water_intake_liters ? `${todayLog.water_intake_liters}L` : 'Not logged'}
            status={todayLog?.water_intake_liters >= 2 ? 'good' : 'neutral'}
          />
          <StatCard
            icon="🌤️"
            label="Sunlight"
            value={todayLog?.sunlight_minutes ? `${todayLog.sunlight_minutes} min` : 'Not logged'}
            status={todayLog?.sunlight_minutes >= 10 ? 'good' : 'neutral'}
          />
          <StatCard
            icon="🧘"
            label="Recovery"
            value={todayLog?.recovery_minutes ? `${todayLog.recovery_minutes} min` : 'Not logged'}
            status={todayLog?.recovery_minutes >= 5 ? 'good' : 'neutral'}
          />
          <StatCard
            icon="🙂"
            label="Mood"
            value={formatMood(todayLog?.mood)}
            status={getMoodStatus(todayLog?.mood)}
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

function formatMood(mood) {
  const moodMap = {
    low: 'Low',
    neutral: 'Neutral',
    good: 'Good',
    great: 'Great'
  }

  return moodMap[mood] || 'Not logged'
}

function getMoodStatus(mood) {
  if (!mood) return 'neutral'
  if (mood === 'low') return 'alert'
  return 'good'
}
