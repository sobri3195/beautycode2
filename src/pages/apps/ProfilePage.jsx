import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '../../hooks/useUser'
import { useHabit } from '../../hooks/useHabit'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import './ProfilePage.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, bodyType, clearUser } = useUser()
  const { habitLogs, currentStreak } = useHabit()
  
  const handleLogout = () => {
    if (confirm('Are you sure you want to reset your data? This cannot be undone.')) {
      clearUser()
      navigate('/home')
    }
  }
  
  const totalDaysLogged = habitLogs.length
  const joinDate = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Today'
  
  return (
    <div className="profile-page">
      <div className="profile-container">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Profile</h1>
          <p>Your health journey overview</p>
        </motion.div>
        
        {/* Body Type Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="body-type-detail">
            <div className="body-type-header">
              <div className="body-type-emoji-large">
                {bodyType?.primary_info?.emoji}
              </div>
              <div>
                <h2>{bodyType?.primary_info?.name}</h2>
                <p className="body-type-subtitle">
                  {bodyType?.primary_info?.description}
                </p>
                <div className="confidence-badge">
                  {bodyType?.confidence_score}% confidence
                </div>
              </div>
            </div>
            
            <div className="characteristics-section">
              <h3>Your Characteristics:</h3>
              <ul className="characteristics-list">
                {bodyType?.primary_info?.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>
            
            {bodyType?.secondary_body_type && (
              <div className="secondary-type">
                <h4>
                  Secondary Type: {bodyType.secondary_info.emoji} {bodyType.secondary_info.name}
                </h4>
                <p>
                  You also show characteristics of {bodyType.secondary_info.name}, 
                  which is considered in your habit recommendations.
                </p>
              </div>
            )}
            
            <div className="reasoning-section">
              <h3>Why This Body Type?</h3>
              <p>{bodyType?.reasoning?.explanation}</p>
            </div>
          </Card>
        </motion.div>
        
        {/* Journey Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3>Journey Stats</h3>
            <div className="journey-stats">
              <StatItem
                icon="📅"
                label="Started"
                value={joinDate}
              />
              <StatItem
                icon="📊"
                label="Days Logged"
                value={totalDaysLogged}
              />
              <StatItem
                icon="🔥"
                label="Current Streak"
                value={`${currentStreak} days`}
              />
              <StatItem
                icon="🎯"
                label="Journey Progress"
                value={`${Math.min(100, Math.round((totalDaysLogged / 90) * 100))}%`}
              />
            </div>
          </Card>
        </motion.div>
        
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3>Basic Information</h3>
            <div className="info-grid">
              <InfoItem label="Age" value={user?.age || 'N/A'} />
              <InfoItem 
                label="Gender" 
                value={user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'N/A'} 
              />
            </div>
          </Card>
        </motion.div>
        
        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3>Settings</h3>
            <div className="settings-list">
              <button className="setting-item">
                <span>🔔</span>
                <span>Notifications</span>
                <span className="setting-value">Coming Soon</span>
              </button>
              <button className="setting-item">
                <span>📤</span>
                <span>Export Data</span>
                <span className="setting-value">Coming Soon</span>
              </button>
              <button className="setting-item">
                <span>🔒</span>
                <span>Privacy</span>
                <span className="setting-value">Coming Soon</span>
              </button>
            </div>
          </Card>
        </motion.div>
        
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3>About Beautycode</h3>
            <p className="about-text">
              Beautycode adalah AI-powered Health Operating System yang membantu Anda 
              memahami body type dan membangun sustainable habits dalam 90 hari.
            </p>
            <p className="about-text">
              Built with 💜 untuk health transformation yang sustainable dan explainable.
            </p>
            <div className="about-version">Version 1.0.0</div>
          </Card>
        </motion.div>
        
        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="danger-card">
            <h3>⚠️ Danger Zone</h3>
            <p>Reset all your data and start fresh. This action cannot be undone.</p>
            <Button
              variant="secondary"
              fullWidth
              onClick={handleLogout}
            >
              Reset & Start Over
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

function StatItem({ icon, label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  )
}
