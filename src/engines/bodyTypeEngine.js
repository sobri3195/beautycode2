import { BODY_TYPE_DEFINITIONS, QUIZ_QUESTIONS } from '../data/bodyTypeQuiz'

// Body Type Engine - Rule-Based System
// Determines body type based on user input with explainable reasoning

const BODY_TYPES = {
  RED: {
    id: 'red',
    name: 'Red Type',
    description: 'Metabolic-sensitive, prone to insulin resistance',
    characteristics: [
      'Berat badan mudah naik terutama di area perut',
      'Energi drop setelah makan karbohidrat tinggi',
      'Cenderung stress eating',
      'Sensitif terhadap gula dan karbohidrat olahan'
    ],
    emoji: '🔴'
  },
  BLUE: {
    id: 'blue',
    name: 'Blue Type',
    description: 'Stress-driven, cortisol-sensitive',
    characteristics: [
      'Mudah lelah mental dan fisik',
      'Tidur terganggu saat stress',
      'Keinginan makan tinggi saat cemas',
      'Recovery lambat setelah aktivitas berat'
    ],
    emoji: '🔵'
  },
  GREEN: {
    id: 'green',
    name: 'Green Type',
    description: 'Inflammation-prone, digestive-sensitive',
    characteristics: [
      'Pencernaan sensitif',
      'Mudah kembung atau tidak nyaman setelah makan',
      'Kulit reaktif atau mudah alergi',
      'Nyeri sendi atau otot yang sering muncul'
    ],
    emoji: '🟢'
  },
  YELLOW: {
    id: 'yellow',
    name: 'Yellow Type',
    description: 'Hormonally-driven, cycle-sensitive',
    characteristics: [
      'Mood swing yang signifikan',
      'Perubahan nafsu makan terkait siklus hormonal',
      'Retensi air yang fluktuatif',
      'Energi sangat dipengaruhi fase hormonal'
    ],
    emoji: '🟡'
  },
  WHITE: {
    id: 'white',
    name: 'White Circle',
    description: 'Calm and empathetic profile',
    characteristics: [
      'Tenang dalam mengambil keputusan',
      'Empatik terhadap orang sekitar',
      'Menyukai harmoni dan kestabilan',
      'Cenderung suportif dan penyayang'
    ],
    emoji: '⚪'
  }
}

const QUIZ_CATEGORY_WEIGHTS = {
  physical: 3,
  physiological: 2,
  personality: 1
}

const QUIZ_CODE_TO_TYPE = {
  A: 'red',
  B: 'green',
  C: 'yellow',
  D: 'white'
}

function isQuizAnswerPayload(userData) {
  const keys = Object.keys(userData || {})
  return keys.some((key) => /^P(T|R|S)\d{2}$/.test(key))
}

export function calculateBodyTypeFromQuizAnswers(answers) {
  const scores = { A: 0, B: 0, C: 0, D: 0 }
  const unanswered = []

  QUIZ_QUESTIONS.forEach((question) => {
    const answer = answers?.[question.question_id]
    if (!answer || !['A', 'B', 'C', 'D'].includes(answer)) {
      unanswered.push(question.question_id)
      return
    }

    const weight = QUIZ_CATEGORY_WEIGHTS[question.category] || 1
    scores[answer] += weight
  })

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [topCode, topScore] = ranked[0]
  const [secondCode, secondScore] = ranked[1]
  const totalScore = Object.values(scores).reduce((acc, value) => acc + value, 0)

  return {
    primary_body_type: QUIZ_CODE_TO_TYPE[topCode],
    primary_quiz_code: topCode,
    primary_info: BODY_TYPE_DEFINITIONS[topCode],
    secondary_body_type: secondScore > 0 ? QUIZ_CODE_TO_TYPE[secondCode] : null,
    secondary_quiz_code: secondScore > 0 ? secondCode : null,
    secondary_info: secondScore > 0 ? BODY_TYPE_DEFINITIONS[secondCode] : null,
    confidence_score: totalScore ? Math.round((topScore / totalScore) * 100) : 0,
    scores,
    unanswered_questions: unanswered,
    reasoning: {
      summary: `Body type dominan Anda adalah ${BODY_TYPE_DEFINITIONS[topCode].type}.`,
      explanation: BODY_TYPE_DEFINITIONS[topCode].core_traits
    },
    timestamp: new Date().toISOString()
  }
}

// Rule definitions
const RULES = {
  // RED TYPE RULES
  insulin_resistance_high: {
    check: (data) => {
      return (
        data.abdominal_fat === 'yes' &&
        data.energy_drop_after_meal === 'yes' &&
        (data.sweet_cravings === 'high' || data.carb_sensitivity === 'yes')
      )
    },
    score: 30,
    type: 'red',
    reasoning: 'Menunjukkan tanda-tanda resistensi insulin: lemak perut, energi drop setelah makan, dan sensitivitas karbohidrat tinggi'
  },
  
  metabolic_pattern: {
    check: (data) => {
      return (
        data.weight_gain_easy === 'yes' &&
        data.weight_distribution === 'upper_body' &&
        data.fasting_glucose_concern === 'yes'
      )
    },
    score: 25,
    type: 'red',
    reasoning: 'Pola metabolik mengarah ke Red Type: berat badan mudah naik di bagian atas tubuh'
  },
  
  // BLUE TYPE RULES
  stress_cortisol_high: {
    check: (data) => {
      return (
        data.stress_level === 'high' &&
        data.sleep_quality === 'poor' &&
        (data.fatigue_level === 'high' || data.stress_eating === 'yes')
      )
    },
    score: 30,
    type: 'blue',
    reasoning: 'Menunjukkan tanda-tanda cortisol tinggi: stress tinggi, tidur buruk, dan kelelahan kronis'
  },
  
  recovery_slow: {
    check: (data) => {
      return (
        data.recovery_rate === 'slow' &&
        data.burnout_feeling === 'yes' &&
        data.anxiety_level === 'high'
      )
    },
    score: 25,
    type: 'blue',
    reasoning: 'Recovery lambat dan burnout adalah indikator Blue Type yang kuat'
  },
  
  // GREEN TYPE RULES
  inflammation_digestive: {
    check: (data) => {
      return (
        data.digestive_issues === 'frequent' &&
        (data.bloating === 'yes' || data.food_sensitivity === 'yes') &&
        (data.skin_issues === 'yes' || data.joint_pain === 'yes')
      )
    },
    score: 30,
    type: 'green',
    reasoning: 'Menunjukkan tanda inflamasi dan sensitivitas pencernaan yang tinggi'
  },
  
  immune_reactive: {
    check: (data) => {
      return (
        data.allergies === 'yes' &&
        data.inflammation_markers === 'high' &&
        data.gut_health === 'poor'
      )
    },
    score: 25,
    type: 'green',
    reasoning: 'Sistem imun reaktif dan gut health buruk mengarah ke Green Type'
  },
  
  // YELLOW TYPE RULES
  hormonal_cycle: {
    check: (data) => {
      return (
        data.gender === 'female' &&
        data.cycle_symptoms === 'severe' &&
        (data.mood_swings === 'yes' || data.cycle_weight_change === 'yes')
      )
    },
    score: 30,
    type: 'yellow',
    reasoning: 'Gejala siklus hormonal yang kuat dan perubahan mood/berat badan signifikan'
  },
  
  hormone_sensitivity: {
    check: (data) => {
      return (
        data.energy_by_cycle === 'yes' &&
        data.water_retention === 'frequent' &&
        data.appetite_fluctuation === 'high'
      )
    },
    score: 25,
    type: 'yellow',
    reasoning: 'Sensitivitas hormonal tinggi dengan fluktuasi energi, retensi air, dan nafsu makan'
  }
}

// Calculate body type based on rules
export function calculateBodyType(userData) {
  if (isQuizAnswerPayload(userData)) {
    return calculateBodyTypeFromQuizAnswers(userData)
  }

  const scores = {
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0
  }
  
  const triggeredRules = []
  
  // Evaluate all rules
  Object.entries(RULES).forEach(([ruleName, rule]) => {
    if (rule.check(userData)) {
      scores[rule.type] += rule.score
      triggeredRules.push({
        name: ruleName,
        type: rule.type,
        score: rule.score,
        reasoning: rule.reasoning
      })
    }
  })
  
  // Find primary type (highest score)
  let primaryType = Object.entries(scores).reduce((max, [type, score]) => {
    return score > max.score ? { type, score } : max
  }, { type: 'red', score: 0 })
  
  // Find secondary type if score is significant
  const sortedScores = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
  
  let secondaryType = null
  if (sortedScores[1][1] >= 20 && sortedScores[1][1] >= sortedScores[0][1] * 0.6) {
    secondaryType = sortedScores[1][0]
  }
  
  // Calculate confidence (0-100)
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const confidence = totalScore > 0 
    ? Math.min(100, Math.round((primaryType.score / totalScore) * 100))
    : 0
  
  // Build result
  const result = {
    primary_body_type: primaryType.type,
    primary_info: BODY_TYPES[primaryType.type.toUpperCase()],
    secondary_body_type: secondaryType,
    secondary_info: secondaryType ? BODY_TYPES[secondaryType.toUpperCase()] : null,
    confidence_score: confidence,
    scores: scores,
    triggered_rules: triggeredRules,
    reasoning: generateReasoning(primaryType.type, secondaryType, triggeredRules),
    timestamp: new Date().toISOString()
  }
  
  return result
}

function generateReasoning(primaryType, secondaryType, triggeredRules) {
  const primaryRules = triggeredRules.filter(r => r.type === primaryType)
  const secondaryRules = secondaryType 
    ? triggeredRules.filter(r => r.type === secondaryType)
    : []
  
  let reasoning = {
    summary: `Berdasarkan analisis, Anda teridentifikasi sebagai ${BODY_TYPES[primaryType.toUpperCase()].name}`,
    primary_factors: primaryRules.map(r => r.reasoning),
    secondary_factors: secondaryRules.map(r => r.reasoning),
    explanation: generateExplanation(primaryType, secondaryType)
  }
  
  return reasoning
}

function generateExplanation(primaryType, secondaryType) {
  const explanations = {
    red: 'Tubuh Anda sangat sensitif terhadap karbohidrat dan gula. Fokus utama adalah mengatur insulin dan metabolisme dengan pola makan yang stabil.',
    blue: 'Sistem stress Anda sangat reaktif. Prioritas adalah menurunkan cortisol melalui sleep quality, recovery, dan stress management.',
    green: 'Anda memiliki kecenderungan inflamasi tinggi. Fokus pada gut health, anti-inflammatory diet, dan mengurangi trigger alergi.',
    yellow: 'Hormon sangat mempengaruhi energi dan mood Anda. Penting untuk align dengan siklus natural dan support hormonal balance.'
  }
  
  let text = explanations[primaryType]
  
  if (secondaryType) {
    text += ` Anda juga menunjukkan karakteristik ${BODY_TYPES[secondaryType.toUpperCase()].name}, jadi pendekatan holistik akan lebih efektif.`
  }
  
  return text
}

// Get body type info
export function getBodyTypeInfo(typeId) {
  return BODY_TYPES[typeId.toUpperCase()]
}

// Export constants
export { BODY_TYPES }
