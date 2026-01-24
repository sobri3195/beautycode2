import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useHabit } from '../../hooks/useHabit'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import './LogPage.css'

export default function LogPage() {
  const { getTodayLog, updateTodayLog } = useHabit()
  const [logData, setLogData] = useState({
    sleep_hours: '',
    sleep_quality: '',
    energy_level: '',
    movement_minutes: '',
    movement_type: '',
    stress_level: '',
    meals_logged: false,
    notes: ''
  })
  
  const [saved, setSaved] = useState(false)
  
  useEffect(() => {
    const todayLog = getTodayLog()
    if (todayLog) {
      setLogData(todayLog)
    }
  }, [])
  
  const handleSave = () => {
    updateTodayLog(logData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }
  
  const updateField = (field, value) => {
    setLogData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <div className="log-page">
      <div className="log-container">
        <motion.div
          className="log-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Daily Log</h1>
          <p>Track your day in 60 seconds</p>
        </motion.div>
        
        {/* Sleep */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="log-section">
              <div className="section-icon">😴</div>
              <h3>Sleep</h3>
            </div>
            
            <div className="form-group">
              <label>How many hours?</label>
              <input
                type="number"
                value={logData.sleep_hours}
                onChange={(e) => updateField('sleep_hours', e.target.value)}
                placeholder="7.5"
                step="0.5"
                min="0"
                max="12"
              />
            </div>
            
            <div className="form-group">
              <label>Quality?</label>
              <div className="button-group">
                <OptionButton
                  selected={logData.sleep_quality === 'poor'}
                  onClick={() => updateField('sleep_quality', 'poor')}
                >
                  Poor
                </OptionButton>
                <OptionButton
                  selected={logData.sleep_quality === 'fair'}
                  onClick={() => updateField('sleep_quality', 'fair')}
                >
                  Fair
                </OptionButton>
                <OptionButton
                  selected={logData.sleep_quality === 'good'}
                  onClick={() => updateField('sleep_quality', 'good')}
                >
                  Good
                </OptionButton>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Energy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="log-section">
              <div className="section-icon">⚡</div>
              <h3>Energy Level</h3>
            </div>
            
            <div className="energy-scale">
              {['very_low', 'low', 'medium', 'high', 'very_high'].map((level, index) => (
                <button
                  key={level}
                  className={`energy-button ${logData.energy_level === level ? 'active' : ''}`}
                  onClick={() => updateField('energy_level', level)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="energy-labels">
              <span>Very Low</span>
              <span>Very High</span>
            </div>
          </Card>
        </motion.div>
        
        {/* Movement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="log-section">
              <div className="section-icon">🏃</div>
              <h3>Movement</h3>
            </div>
            
            <div className="form-group">
              <label>How many minutes?</label>
              <input
                type="number"
                value={logData.movement_minutes}
                onChange={(e) => updateField('movement_minutes', e.target.value)}
                placeholder="30"
                min="0"
                max="300"
              />
            </div>
            
            <div className="form-group">
              <label>Type?</label>
              <select
                value={logData.movement_type}
                onChange={(e) => updateField('movement_type', e.target.value)}
              >
                <option value="">Select type</option>
                <option value="walking">Walking</option>
                <option value="running">Running</option>
                <option value="yoga">Yoga</option>
                <option value="strength">Strength Training</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
                <option value="other">Other</option>
              </select>
            </div>
          </Card>
        </motion.div>
        
        {/* Stress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="log-section">
              <div className="section-icon">😌</div>
              <h3>Stress Level</h3>
            </div>
            
            <div className="button-group">
              <OptionButton
                selected={logData.stress_level === 'low'}
                onClick={() => updateField('stress_level', 'low')}
              >
                Low
              </OptionButton>
              <OptionButton
                selected={logData.stress_level === 'medium'}
                onClick={() => updateField('stress_level', 'medium')}
              >
                Medium
              </OptionButton>
              <OptionButton
                selected={logData.stress_level === 'high'}
                onClick={() => updateField('stress_level', 'high')}
              >
                High
              </OptionButton>
            </div>
          </Card>
        </motion.div>
        
        {/* Nutrition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="log-section">
              <div className="section-icon">🥗</div>
              <h3>Nutrition</h3>
            </div>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={logData.meals_logged}
                onChange={(e) => updateField('meals_logged', e.target.checked)}
              />
              <span>I tracked my meals today</span>
            </label>
          </Card>
        </motion.div>
        
        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="log-section">
              <div className="section-icon">📝</div>
              <h3>Notes (Optional)</h3>
            </div>
            
            <textarea
              value={logData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Anything you want to remember about today..."
              rows="3"
            />
          </Card>
        </motion.div>
        
        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            fullWidth
            size="lg"
            onClick={handleSave}
            variant={saved ? 'secondary' : 'primary'}
          >
            {saved ? '✓ Saved!' : 'Save Today\'s Log'}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function OptionButton({ children, selected, onClick }) {
  return (
    <motion.button
      className={`option-btn ${selected ? 'option-btn-selected' : ''}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
