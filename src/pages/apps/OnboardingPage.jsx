import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '../../hooks/useUser'
import { calculateBodyType } from '../../engines/bodyTypeEngine'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import './OnboardingPage.css'

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to Beautycode',
    subtitle: 'Let\'s understand your unique body type'
  },
  {
    id: 'basic',
    title: 'Basic Information',
    subtitle: 'Help us personalize your experience'
  },
  {
    id: 'body',
    title: 'Body Characteristics',
    subtitle: 'Understanding your physical patterns'
  },
  {
    id: 'energy',
    title: 'Energy & Stress',
    subtitle: 'How your body responds to stress'
  },
  {
    id: 'health',
    title: 'Health Patterns',
    subtitle: 'Digestive and immune system'
  },
  {
    id: 'result',
    title: 'Your Body Type',
    subtitle: 'Understanding your biological kernel'
  }
]

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { updateUser, updateBodyType } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic
    age: '',
    gender: '',
    
    // Body characteristics
    weight_gain_easy: '',
    weight_distribution: '',
    abdominal_fat: '',
    
    // Energy & Metabolic
    energy_drop_after_meal: '',
    sweet_cravings: '',
    carb_sensitivity: '',
    
    // Stress patterns
    stress_level: '',
    sleep_quality: '',
    fatigue_level: '',
    stress_eating: '',
    recovery_rate: '',
    anxiety_level: '',
    
    // Digestive
    digestive_issues: '',
    bloating: '',
    food_sensitivity: '',
    
    // Inflammation
    skin_issues: '',
    joint_pain: '',
    allergies: '',
    gut_health: '',
    
    // Hormonal (if applicable)
    cycle_symptoms: '',
    mood_swings: '',
    cycle_weight_change: '',
    water_retention: ''
  })
  
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }
  
  const handleComplete = () => {
    // Calculate body type
    const bodyTypeResult = calculateBodyType(formData)
    
    // Save user data
    updateUser({
      ...formData,
      onboarding_completed: true,
      created_at: new Date().toISOString()
    })
    
    // Save body type
    updateBodyType(bodyTypeResult)
    
    // Navigate to today page
    navigate('/apps/today')
  }
  
  const progress = ((currentStep + 1) / STEPS.length) * 100
  
  return (
    <div className="onboarding-page">
      {/* Progress Bar */}
      <div className="onboarding-progress">
        <motion.div
          className="onboarding-progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Content */}
      <div className="onboarding-content">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <WelcomeStep key="welcome" onNext={handleNext} />
          )}
          
          {currentStep === 1 && (
            <BasicStep
              key="basic"
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 2 && (
            <BodyStep
              key="body"
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 3 && (
            <EnergyStep
              key="energy"
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 4 && (
            <HealthStep
              key="health"
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          
          {currentStep === 5 && (
            <ResultStep
              key="result"
              formData={formData}
              onComplete={handleComplete}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function WelcomeStep({ onNext }) {
  return (
    <motion.div
      className="onboarding-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="step-header">
        <div className="step-emoji">👋</div>
        <h1>Welcome to Beautycode</h1>
        <p>Your AI-powered Health Operating System</p>
      </div>
      
      <Card className="welcome-card">
        <h3>What to expect:</h3>
        <ul className="welcome-list">
          <li>
            <span className="list-icon">⏱️</span>
            <span>5 minutes questionnaire</span>
          </li>
          <li>
            <span className="list-icon">🧬</span>
            <span>Identify your unique body type</span>
          </li>
          <li>
            <span className="list-icon">🎯</span>
            <span>Get personalized habit recommendations</span>
          </li>
          <li>
            <span className="list-icon">📊</span>
            <span>Track progress with explainable insights</span>
          </li>
        </ul>
      </Card>
      
      <Card className="disclaimer-card">
        <div className="disclaimer-icon-small">⚠️</div>
        <p>
          <strong>Important:</strong> Ini bukan medical diagnosis. 
          Selalu konsultasi dengan healthcare professional untuk medical concerns.
        </p>
      </Card>
      
      <Button fullWidth size="lg" onClick={onNext}>
        Let's Start ✨
      </Button>
    </motion.div>
  )
}

function BasicStep({ formData, updateFormData, onNext, onBack }) {
  const canProceed = formData.age && formData.gender
  
  return (
    <motion.div
      className="onboarding-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="step-header">
        <h2>Basic Information</h2>
        <p>Help us personalize your experience</p>
      </div>
      
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => updateFormData('age', e.target.value)}
          placeholder="Enter your age"
          min="15"
          max="100"
        />
      </div>
      
      <div className="form-group">
        <label>Gender</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.gender === 'female'}
            onClick={() => updateFormData('gender', 'female')}
          >
            Female
          </OptionButton>
          <OptionButton
            selected={formData.gender === 'male'}
            onClick={() => updateFormData('gender', 'male')}
          >
            Male
          </OptionButton>
        </div>
      </div>
      
      <div className="button-group">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!canProceed} onClick={onNext}>
          Next
        </Button>
      </div>
    </motion.div>
  )
}

function BodyStep({ formData, updateFormData, onNext, onBack }) {
  return (
    <motion.div
      className="onboarding-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="step-header">
        <h2>Body Characteristics</h2>
        <p>Understanding your physical patterns</p>
      </div>
      
      <div className="form-group">
        <label>Apakah berat badan Anda mudah naik?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.weight_gain_easy === 'yes'}
            onClick={() => updateFormData('weight_gain_easy', 'yes')}
          >
            Ya
          </OptionButton>
          <OptionButton
            selected={formData.weight_gain_easy === 'no'}
            onClick={() => updateFormData('weight_gain_easy', 'no')}
          >
            Tidak
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Di mana berat badan cenderung naik?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.weight_distribution === 'upper_body'}
            onClick={() => updateFormData('weight_distribution', 'upper_body')}
          >
            Perut/Upper Body
          </OptionButton>
          <OptionButton
            selected={formData.weight_distribution === 'lower_body'}
            onClick={() => updateFormData('weight_distribution', 'lower_body')}
          >
            Pinggul/Lower Body
          </OptionButton>
          <OptionButton
            selected={formData.weight_distribution === 'overall'}
            onClick={() => updateFormData('weight_distribution', 'overall')}
          >
            Merata
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Apakah Anda memiliki lemak di area perut?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.abdominal_fat === 'yes'}
            onClick={() => updateFormData('abdominal_fat', 'yes')}
          >
            Ya
          </OptionButton>
          <OptionButton
            selected={formData.abdominal_fat === 'no'}
            onClick={() => updateFormData('abdominal_fat', 'no')}
          >
            Tidak
          </OptionButton>
        </div>
      </div>
      
      <div className="button-group">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </motion.div>
  )
}

function EnergyStep({ formData, updateFormData, onNext, onBack }) {
  return (
    <motion.div
      className="onboarding-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="step-header">
        <h2>Energy & Stress Patterns</h2>
        <p>How your body responds</p>
      </div>
      
      <div className="form-group">
        <label>Apakah energi Anda drop setelah makan?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.energy_drop_after_meal === 'yes'}
            onClick={() => updateFormData('energy_drop_after_meal', 'yes')}
          >
            Ya, sering
          </OptionButton>
          <OptionButton
            selected={formData.energy_drop_after_meal === 'sometimes'}
            onClick={() => updateFormData('energy_drop_after_meal', 'sometimes')}
          >
            Kadang
          </OptionButton>
          <OptionButton
            selected={formData.energy_drop_after_meal === 'no'}
            onClick={() => updateFormData('energy_drop_after_meal', 'no')}
          >
            Jarang
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Stress level Anda?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.stress_level === 'low'}
            onClick={() => updateFormData('stress_level', 'low')}
          >
            Rendah
          </OptionButton>
          <OptionButton
            selected={formData.stress_level === 'medium'}
            onClick={() => updateFormData('stress_level', 'medium')}
          >
            Sedang
          </OptionButton>
          <OptionButton
            selected={formData.stress_level === 'high'}
            onClick={() => updateFormData('stress_level', 'high')}
          >
            Tinggi
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Kualitas tidur Anda?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.sleep_quality === 'good'}
            onClick={() => updateFormData('sleep_quality', 'good')}
          >
            Baik
          </OptionButton>
          <OptionButton
            selected={formData.sleep_quality === 'fair'}
            onClick={() => updateFormData('sleep_quality', 'fair')}
          >
            Cukup
          </OptionButton>
          <OptionButton
            selected={formData.sleep_quality === 'poor'}
            onClick={() => updateFormData('sleep_quality', 'poor')}
          >
            Buruk
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Recovery rate setelah aktivitas berat?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.recovery_rate === 'fast'}
            onClick={() => updateFormData('recovery_rate', 'fast')}
          >
            Cepat
          </OptionButton>
          <OptionButton
            selected={formData.recovery_rate === 'medium'}
            onClick={() => updateFormData('recovery_rate', 'medium')}
          >
            Sedang
          </OptionButton>
          <OptionButton
            selected={formData.recovery_rate === 'slow'}
            onClick={() => updateFormData('recovery_rate', 'slow')}
          >
            Lambat
          </OptionButton>
        </div>
      </div>
      
      <div className="button-group">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </motion.div>
  )
}

function HealthStep({ formData, updateFormData, onNext, onBack }) {
  return (
    <motion.div
      className="onboarding-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="step-header">
        <h2>Health Patterns</h2>
        <p>Digestive and immune system</p>
      </div>
      
      <div className="form-group">
        <label>Seberapa sering masalah pencernaan?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.digestive_issues === 'rare'}
            onClick={() => updateFormData('digestive_issues', 'rare')}
          >
            Jarang
          </OptionButton>
          <OptionButton
            selected={formData.digestive_issues === 'sometimes'}
            onClick={() => updateFormData('digestive_issues', 'sometimes')}
          >
            Kadang
          </OptionButton>
          <OptionButton
            selected={formData.digestive_issues === 'frequent'}
            onClick={() => updateFormData('digestive_issues', 'frequent')}
          >
            Sering
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Apakah mudah kembung setelah makan?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.bloating === 'yes'}
            onClick={() => updateFormData('bloating', 'yes')}
          >
            Ya
          </OptionButton>
          <OptionButton
            selected={formData.bloating === 'no'}
            onClick={() => updateFormData('bloating', 'no')}
          >
            Tidak
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Apakah Anda memiliki skin issues?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.skin_issues === 'yes'}
            onClick={() => updateFormData('skin_issues', 'yes')}
          >
            Ya
          </OptionButton>
          <OptionButton
            selected={formData.skin_issues === 'no'}
            onClick={() => updateFormData('skin_issues', 'no')}
          >
            Tidak
          </OptionButton>
        </div>
      </div>
      
      <div className="form-group">
        <label>Gut health Anda?</label>
        <div className="option-grid">
          <OptionButton
            selected={formData.gut_health === 'good'}
            onClick={() => updateFormData('gut_health', 'good')}
          >
            Baik
          </OptionButton>
          <OptionButton
            selected={formData.gut_health === 'fair'}
            onClick={() => updateFormData('gut_health', 'fair')}
          >
            Cukup
          </OptionButton>
          <OptionButton
            selected={formData.gut_health === 'poor'}
            onClick={() => updateFormData('gut_health', 'poor')}
          >
            Buruk
          </OptionButton>
        </div>
      </div>
      
      {formData.gender === 'female' && (
        <>
          <div className="form-group">
            <label>Gejala siklus hormonal?</label>
            <div className="option-grid">
              <OptionButton
                selected={formData.cycle_symptoms === 'mild'}
                onClick={() => updateFormData('cycle_symptoms', 'mild')}
              >
                Ringan
              </OptionButton>
              <OptionButton
                selected={formData.cycle_symptoms === 'moderate'}
                onClick={() => updateFormData('cycle_symptoms', 'moderate')}
              >
                Sedang
              </OptionButton>
              <OptionButton
                selected={formData.cycle_symptoms === 'severe'}
                onClick={() => updateFormData('cycle_symptoms', 'severe')}
              >
                Berat
              </OptionButton>
            </div>
          </div>
          
          <div className="form-group">
            <label>Mood swings terkait siklus?</label>
            <div className="option-grid">
              <OptionButton
                selected={formData.mood_swings === 'yes'}
                onClick={() => updateFormData('mood_swings', 'yes')}
              >
                Ya
              </OptionButton>
              <OptionButton
                selected={formData.mood_swings === 'no'}
                onClick={() => updateFormData('mood_swings', 'no')}
              >
                Tidak
              </OptionButton>
            </div>
          </div>
        </>
      )}
      
      <div className="button-group">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          See My Results
        </Button>
      </div>
    </motion.div>
  )
}

function ResultStep({ formData, onComplete }) {
  const bodyTypeResult = calculateBodyType(formData)
  
  return (
    <motion.div
      className="onboarding-step result-step"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="result-header">
        <motion.div
          className="result-emoji"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          {bodyTypeResult.primary_info.emoji}
        </motion.div>
        <h2>Your Body Type</h2>
        <h1>{bodyTypeResult.primary_info.name}</h1>
        <p className="result-description">
          {bodyTypeResult.primary_info.description}
        </p>
      </div>
      
      <Card variant="elevated">
        <div className="confidence-score">
          <span>Confidence Score</span>
          <motion.div
            className="confidence-bar"
            initial={{ width: 0 }}
            animate={{ width: `${bodyTypeResult.confidence_score}%` }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span>{bodyTypeResult.confidence_score}%</span>
          </motion.div>
        </div>
      </Card>
      
      <Card>
        <h3>Karakteristik Utama:</h3>
        <ul className="characteristics-list">
          {bodyTypeResult.primary_info.characteristics.map((char, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {char}
            </motion.li>
          ))}
        </ul>
      </Card>
      
      <Card>
        <h3>Why This Body Type?</h3>
        <p>{bodyTypeResult.reasoning.explanation}</p>
      </Card>
      
      {bodyTypeResult.secondary_body_type && (
        <Card variant="bordered">
          <h3>Secondary Type: {bodyTypeResult.secondary_info.name}</h3>
          <p className="text-sm">
            Anda juga menunjukkan karakteristik {bodyTypeResult.secondary_info.name}. 
            Habit recommendations akan consider kedua types ini.
          </p>
        </Card>
      )}
      
      <Button fullWidth size="lg" onClick={onComplete}>
        Start My 90-Day Journey 🚀
      </Button>
    </motion.div>
  )
}

function OptionButton({ children, selected, onClick }) {
  return (
    <motion.button
      className={`option-button ${selected ? 'option-button-selected' : ''}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
