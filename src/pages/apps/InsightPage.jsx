import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '../../hooks/useUser'
import { useHabit } from '../../hooks/useHabit'
import { generateWeeklySummary } from '../../engines/insightEngine'
import Card from '../../components/ui/Card'
import './InsightPage.css'

export default function InsightPage() {
  const { user, bodyType } = useUser()
  const { getWeekLogs } = useHabit()
  const [weeklySummary, setWeeklySummary] = useState(null)
  const [activeTab, setActiveTab] = useState('week')
  
  useEffect(() => {
    const weekLogs = getWeekLogs()
    if (weekLogs.length > 0 && bodyType) {
      const summary = generateWeeklySummary(weekLogs, bodyType)
      setWeeklySummary(summary)
    }
  }, [bodyType])
  
  return (
    <div className="insight-page">
      <div className="insight-container">
        <motion.div
          className="insight-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Insights</h1>
          <p>Your health patterns & progress</p>
        </motion.div>
        
        {/* Tabs */}
        <div className="insight-tabs">
          <button
            className={`tab ${activeTab === 'week' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            This Week
          </button>
          <button
            className={`tab ${activeTab === 'patterns' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('patterns')}
          >
            Patterns
          </button>
          <button
            className={`tab ${activeTab === 'tips' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            Tips
          </button>
        </div>
        
        {activeTab === 'week' && weeklySummary && (
          <WeeklyView summary={weeklySummary} />
        )}
        
        {activeTab === 'patterns' && (
          <PatternsView />
        )}
        
        {activeTab === 'tips' && bodyType && (
          <TipsView bodyType={bodyType} />
        )}
      </div>
    </div>
  )
}

function WeeklyView({ summary }) {
  return (
    <div className="weekly-view">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <h3>Week {summary.week_number} Summary</h3>
          <div className="stats-grid">
            <StatItem
              icon="📊"
              label="Days Logged"
              value={`${summary.total_days}/7`}
            />
            <StatItem
              icon="😴"
              label="Avg Sleep"
              value={`${summary.stats.avg_sleep}h`}
            />
            <StatItem
              icon="🏃"
              label="Avg Movement"
              value={`${summary.stats.avg_movement} min`}
            />
            <StatItem
              icon="✅"
              label="Habits Done"
              value={summary.stats.total_habits_completed}
            />
          </div>
        </Card>
      </motion.div>
      
      {/* Wins */}
      {summary.wins.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="wins-card">
            <h3>🎉 This Week's Wins</h3>
            <ul className="wins-list">
              {summary.wins.map((win, index) => (
                <li key={index}>{win}</li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
      
      {/* Insights */}
      {summary.insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3>💡 Key Insights</h3>
            {summary.insights.map((insight, index) => (
              <div key={index} className="insight-item">
                <h4>{insight.title}</h4>
                <p>{insight.message}</p>
                <div className="insight-impact">
                  Impact: <span>{insight.impact}</span>
                </div>
              </div>
            ))}
          </Card>
        </motion.div>
      )}
      
      {/* Areas to Improve */}
      {summary.areas_to_improve.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="improve-card">
            <h3>🎯 Focus Areas</h3>
            {summary.areas_to_improve.map((area, index) => (
              <div key={index} className="improve-item">
                <h4>{area.area}</h4>
                <div className="progress-bar">
                  <div className="progress-current">
                    Current: {area.current}
                  </div>
                  <div className="progress-target">
                    Target: {area.target}
                  </div>
                </div>
                <p className="improve-suggestion">{area.suggestion}</p>
              </div>
            ))}
          </Card>
        </motion.div>
      )}
      
      {/* Next Week Focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="focus-next-card">
          <h3>🔮 Next Week Focus</h3>
          <p>{summary.next_week_focus}</p>
        </Card>
      </motion.div>
    </div>
  )
}

function PatternsView() {
  return (
    <div className="patterns-view">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>Pattern Recognition</h3>
            <p>
              Keep logging untuk setidaknya 2 minggu untuk melihat patterns yang meaningful.
              AI akan analyze correlations antara sleep, nutrition, movement, dan energy levels.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

function TipsView({ bodyType }) {
  const tips = getTipsForBodyType(bodyType.primary_body_type)
  
  return (
    <div className="tips-view">
      {tips.map((tip, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
            <div className="tip-action">
              <strong>Try this:</strong> {tip.action}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function StatItem({ icon, label, value }) {
  return (
    <div className="stat-item">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function getTipsForBodyType(bodyType) {
  const tipsByType = {
    red: [
      {
        icon: '🍽️',
        title: 'Meal Timing Matters',
        description: 'Untuk Red Type, WHEN you eat sama pentingnya dengan WHAT you eat',
        action: 'Try time-restricted eating: 12-14 jam eating window'
      },
      {
        icon: '🚶',
        title: 'Post-Meal Movement',
        description: '10 menit jalan setelah makan bisa reduce blood sugar spike hingga 30%',
        action: 'Set reminder untuk jalan santai 10 menit setelah lunch'
      },
      {
        icon: '💪',
        title: 'Build Muscle Mass',
        description: 'Muscle adalah insulin sink terbaik untuk metabolic health',
        action: 'Add 2x strength training per minggu, focus compound movements'
      }
    ],
    blue: [
      {
        icon: '🧘',
        title: 'Prioritize Recovery',
        description: 'Blue Type butuh lebih banyak downtime untuk nervous system reset',
        action: 'Schedule mandatory rest day setiap minggu'
      },
      {
        icon: '😴',
        title: 'Sleep is Non-Negotiable',
        description: 'Sleep debt directly spike cortisol dan worsen semua symptoms',
        action: 'Set consistent bedtime dan create wind-down ritual'
      },
      {
        icon: '🌬️',
        title: 'Breathwork Daily',
        description: 'Breathing exercise adalah fastest way to calm nervous system',
        action: '5 menit box breathing setiap pagi dan malam'
      }
    ],
    green: [
      {
        icon: '🥗',
        title: 'Anti-Inflammatory Focus',
        description: 'Food choices directly impact inflammation levels',
        action: 'Rainbow vegetables setiap hari, minimize processed foods'
      },
      {
        icon: '🦠',
        title: 'Gut Health Priority',
        description: 'Healthy gut = reduced inflammation = better overall health',
        action: 'Add fermented foods atau probiotic supplement'
      },
      {
        icon: '❄️',
        title: 'Cold Therapy',
        description: 'Cold exposure bisa significantly reduce inflammatory markers',
        action: 'End shower dengan 30-60 detik cold water'
      }
    ],
    yellow: [
      {
        icon: '📅',
        title: 'Track Your Cycle',
        description: 'Awareness of cycle phases help you plan dan prepare',
        action: 'Use cycle tracking app untuk predict symptoms'
      },
      {
        icon: '🍽️',
        title: 'Cycle-Based Nutrition',
        description: 'Nutritional needs berbeda di follicular vs luteal phase',
        action: 'Adjust calories dan macros berdasarkan fase cycle'
      },
      {
        icon: '💝',
        title: 'Self-Compassion Practice',
        description: 'Hormonal fluctuations adalah natural, bukan weakness',
        action: 'Journaling untuk recognize patterns tanpa judgment'
      }
    ]
  }
  
  return tipsByType[bodyType] || tipsByType.blue
}
