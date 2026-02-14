// Body Type Quiz Scoring Engine (v1.0)
// Implements weighted category scoring for 4 body types.

export const ANSWER_TO_TYPE = Object.freeze({
  A: 'Red Oval',
  B: 'Green Square',
  C: 'Yellow Rectangle',
  D: 'White Circle'
})

export const CATEGORY_WEIGHTS = Object.freeze({
  physical_traits: 0.6,
  physiological_response: 0.2,
  personality_traits: 0.2
})

export const BODY_TYPE_DESCRIPTIONS = Object.freeze({
  'Red Oval': 'Cenderung dominan pada pola fisik/metabolik dan perlu stabilitas ritme harian.',
  'Green Square': 'Cenderung stabil saat struktur pola hidup konsisten dan terarah.',
  'Yellow Rectangle': 'Cenderung adaptif, dengan respons yang berubah mengikuti konteks tubuh.',
  'White Circle': 'Cenderung seimbang, tetapi tetap membutuhkan monitoring kebiasaan dasar.'
})

const BODY_TYPES = Object.values(ANSWER_TO_TYPE)

function toPercentDistribution(weightedScores) {
  const sum = Object.values(weightedScores).reduce((acc, value) => acc + value, 0)

  // Fallback when no valid answers were provided
  if (sum === 0) {
    return {
      'Red Oval': 25,
      'Green Square': 25,
      'Yellow Rectangle': 25,
      'White Circle': 25
    }
  }

  const exact = BODY_TYPES.map((type) => ({
    type,
    exact: (weightedScores[type] / sum) * 100
  }))

  const base = {}
  let currentTotal = 0
  exact.forEach(({ type, exact: value }) => {
    base[type] = Math.floor(value)
    currentTotal += base[type]
  })

  let remainder = 100 - currentTotal
  const remainders = exact
    .map(({ type, exact: value }) => ({ type, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac)

  for (let i = 0; i < remainder; i += 1) {
    base[remainders[i % remainders.length].type] += 1
  }

  return base
}

function getDominance(distribution) {
  const sorted = Object.entries(distribution).sort((a, b) => b[1] - a[1])
  const [dominantType, dominantScore] = sorted[0]
  const [secondaryType, secondaryScore] = sorted[1]

  return {
    dominant_type: dominantType,
    secondary_type: secondaryType,
    multi_dominant: dominantScore - secondaryScore < 10
  }
}

export function scoreBodyTypeQuiz({ answers, questions }) {
  const rawScores = {
    'Red Oval': 0,
    'Green Square': 0,
    'Yellow Rectangle': 0,
    'White Circle': 0
  }

  const categorizedCounts = {
    physical_traits: { total: 0, byType: { ...rawScores } },
    physiological_response: { total: 0, byType: { ...rawScores } },
    personality_traits: { total: 0, byType: { ...rawScores } }
  }

  questions.forEach((question) => {
    const answer = answers[question.id]
    const type = ANSWER_TO_TYPE[answer]

    if (!type || !categorizedCounts[question.category]) {
      return
    }

    rawScores[type] += 1
    categorizedCounts[question.category].total += 1
    categorizedCounts[question.category].byType[type] += 1
  })

  const answeredWeights = Object.entries(categorizedCounts).reduce((acc, [category, data]) => {
    if (data.total > 0) {
      return acc + CATEGORY_WEIGHTS[category]
    }
    return acc
  }, 0)

  const weightedScores = {
    'Red Oval': 0,
    'Green Square': 0,
    'Yellow Rectangle': 0,
    'White Circle': 0
  }

  Object.entries(categorizedCounts).forEach(([category, data]) => {
    if (data.total === 0) return

    const normalizedWeight = answeredWeights > 0
      ? CATEGORY_WEIGHTS[category] / answeredWeights
      : 0

    BODY_TYPES.forEach((type) => {
      weightedScores[type] += (data.byType[type] / data.total) * normalizedWeight
    })
  })

  const distribution = toPercentDistribution(weightedScores)
  const dominance = getDominance(distribution)

  return {
    ...dominance,
    distribution,
    raw_score: rawScores,
    weighted_score: weightedScores,
    category_breakdown: categorizedCounts,
    descriptions: BODY_TYPE_DESCRIPTIONS
  }
}

export function createQuizResultRecord({ userId, answers, questions, quizVersion = 'v1.0', createdAt = new Date().toISOString() }) {
  const result = scoreBodyTypeQuiz({ answers, questions })

  return {
    user_id: userId,
    quiz_version: quizVersion,
    answers,
    result,
    created_at: createdAt
  }
}
