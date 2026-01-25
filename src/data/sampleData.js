// Sample data for testing and development

export const SAMPLE_USER_RED_TYPE = {
  age: 35,
  gender: 'female',
  weight_gain_easy: 'yes',
  weight_distribution: 'upper_body',
  abdominal_fat: 'yes',
  energy_drop_after_meal: 'yes',
  sweet_cravings: 'high',
  carb_sensitivity: 'yes',
  stress_level: 'medium',
  sleep_quality: 'fair',
  fatigue_level: 'medium',
  stress_eating: 'yes',
  recovery_rate: 'medium',
  anxiety_level: 'medium',
  digestive_issues: 'sometimes',
  bloating: 'yes',
  food_sensitivity: 'no',
  skin_issues: 'no',
  joint_pain: 'no',
  allergies: 'no',
  gut_health: 'fair',
  fasting_glucose_concern: 'yes',
  cycle_symptoms: 'moderate',
  mood_swings: 'yes',
  cycle_weight_change: 'yes',
  water_retention: 'sometimes'
}

export const SAMPLE_USER_BLUE_TYPE = {
  age: 28,
  gender: 'male',
  weight_gain_easy: 'no',
  weight_distribution: 'overall',
  abdominal_fat: 'no',
  energy_drop_after_meal: 'no',
  sweet_cravings: 'low',
  carb_sensitivity: 'no',
  stress_level: 'high',
  sleep_quality: 'poor',
  fatigue_level: 'high',
  stress_eating: 'yes',
  recovery_rate: 'slow',
  anxiety_level: 'high',
  burnout_feeling: 'yes',
  digestive_issues: 'rare',
  bloating: 'no',
  food_sensitivity: 'no',
  skin_issues: 'no',
  joint_pain: 'no',
  allergies: 'no',
  gut_health: 'good'
}

export const SAMPLE_USER_GREEN_TYPE = {
  age: 32,
  gender: 'female',
  weight_gain_easy: 'sometimes',
  weight_distribution: 'overall',
  abdominal_fat: 'no',
  energy_drop_after_meal: 'sometimes',
  sweet_cravings: 'medium',
  carb_sensitivity: 'no',
  stress_level: 'medium',
  sleep_quality: 'fair',
  fatigue_level: 'medium',
  stress_eating: 'no',
  recovery_rate: 'medium',
  anxiety_level: 'medium',
  digestive_issues: 'frequent',
  bloating: 'yes',
  food_sensitivity: 'yes',
  skin_issues: 'yes',
  joint_pain: 'yes',
  allergies: 'yes',
  gut_health: 'poor',
  inflammation_markers: 'high',
  cycle_symptoms: 'mild',
  mood_swings: 'no'
}

export const SAMPLE_USER_YELLOW_TYPE = {
  age: 29,
  gender: 'female',
  weight_gain_easy: 'sometimes',
  weight_distribution: 'lower_body',
  abdominal_fat: 'no',
  energy_drop_after_meal: 'no',
  sweet_cravings: 'medium',
  carb_sensitivity: 'no',
  stress_level: 'medium',
  sleep_quality: 'fair',
  fatigue_level: 'medium',
  stress_eating: 'sometimes',
  recovery_rate: 'medium',
  anxiety_level: 'medium',
  digestive_issues: 'sometimes',
  bloating: 'sometimes',
  food_sensitivity: 'no',
  skin_issues: 'no',
  joint_pain: 'no',
  allergies: 'no',
  gut_health: 'fair',
  cycle_symptoms: 'severe',
  mood_swings: 'yes',
  cycle_weight_change: 'yes',
  water_retention: 'frequent',
  energy_by_cycle: 'yes',
  appetite_fluctuation: 'high'
}

export const SAMPLE_DAILY_LOG = {
  date: new Date().toISOString().split('T')[0],
  sleep_hours: 7.5,
  sleep_quality: 'good',
  energy_level: 'high',
  movement_minutes: 30,
  movement_type: 'walking',
  stress_level: 'low',
  meals_logged: true,
  habits_completed: 2,
  notes: 'Felt great today! Morning walk really helped.',
  timestamp: new Date().toISOString()
}

export const SAMPLE_WEEK_LOGS = [
  {
    date: '2024-01-14',
    sleep_hours: 7,
    sleep_quality: 'good',
    energy_level: 'high',
    movement_minutes: 25,
    movement_type: 'yoga',
    stress_level: 'low',
    meals_logged: true,
    habits_completed: 2
  },
  {
    date: '2024-01-15',
    sleep_hours: 6.5,
    sleep_quality: 'fair',
    energy_level: 'medium',
    movement_minutes: 15,
    movement_type: 'walking',
    stress_level: 'medium',
    meals_logged: true,
    habits_completed: 1
  },
  {
    date: '2024-01-16',
    sleep_hours: 8,
    sleep_quality: 'good',
    energy_level: 'high',
    movement_minutes: 40,
    movement_type: 'running',
    stress_level: 'low',
    meals_logged: true,
    habits_completed: 3
  },
  {
    date: '2024-01-17',
    sleep_hours: 7.5,
    sleep_quality: 'good',
    energy_level: 'high',
    movement_minutes: 30,
    movement_type: 'strength',
    stress_level: 'low',
    meals_logged: false,
    habits_completed: 2
  },
  {
    date: '2024-01-18',
    sleep_hours: 6,
    sleep_quality: 'poor',
    energy_level: 'low',
    movement_minutes: 10,
    movement_type: 'walking',
    stress_level: 'high',
    meals_logged: true,
    habits_completed: 1
  },
  {
    date: '2024-01-19',
    sleep_hours: 7,
    sleep_quality: 'fair',
    energy_level: 'medium',
    movement_minutes: 20,
    movement_type: 'yoga',
    stress_level: 'medium',
    meals_logged: true,
    habits_completed: 2
  },
  {
    date: '2024-01-20',
    sleep_hours: 7.5,
    sleep_quality: 'good',
    energy_level: 'high',
    movement_minutes: 35,
    movement_type: 'cycling',
    stress_level: 'low',
    meals_logged: true,
    habits_completed: 2
  }
]

// Helper function untuk test body type calculation
export function testBodyTypeEngine() {
  const { calculateBodyType } = require('../engines/bodyTypeEngine')
  
  console.log('Testing Body Type Engine...\n')
  
  console.log('1. Red Type Test:')
  const redResult = calculateBodyType(SAMPLE_USER_RED_TYPE)
  console.log(`   Primary: ${redResult.primary_body_type}`)
  console.log(`   Confidence: ${redResult.confidence_score}%`)
  console.log(`   Expected: red\n`)
  
  console.log('2. Blue Type Test:')
  const blueResult = calculateBodyType(SAMPLE_USER_BLUE_TYPE)
  console.log(`   Primary: ${blueResult.primary_body_type}`)
  console.log(`   Confidence: ${blueResult.confidence_score}%`)
  console.log(`   Expected: blue\n`)
  
  console.log('3. Green Type Test:')
  const greenResult = calculateBodyType(SAMPLE_USER_GREEN_TYPE)
  console.log(`   Primary: ${greenResult.primary_body_type}`)
  console.log(`   Confidence: ${greenResult.confidence_score}%`)
  console.log(`   Expected: green\n`)
  
  console.log('4. Yellow Type Test:')
  const yellowResult = calculateBodyType(SAMPLE_USER_YELLOW_TYPE)
  console.log(`   Primary: ${yellowResult.primary_body_type}`)
  console.log(`   Confidence: ${yellowResult.confidence_score}%`)
  console.log(`   Expected: yellow\n`)
}

// Helper function untuk test habit generation
export function testHabitEngine() {
  const { generateDailyHabits } = require('../engines/habitEngine')
  const { calculateBodyType } = require('../engines/bodyTypeEngine')
  
  console.log('Testing Habit Engine...\n')
  
  const bodyType = calculateBodyType(SAMPLE_USER_RED_TYPE)
  const habits = generateDailyHabits(bodyType, 1)
  
  console.log('Generated Habits:')
  console.log(`Main: ${habits.main_habit.title}`)
  console.log(`Secondary: ${habits.secondary_habit?.title || 'None'}`)
  console.log(`Focus: ${habits.focus_message}\n`)
}

// Helper function untuk test insight generation
export function testInsightEngine() {
  const { generateWeeklySummary } = require('../engines/insightEngine')
  const { calculateBodyType } = require('../engines/bodyTypeEngine')
  
  console.log('Testing Insight Engine...\n')
  
  const bodyType = calculateBodyType(SAMPLE_USER_RED_TYPE)
  const summary = generateWeeklySummary(SAMPLE_WEEK_LOGS, bodyType)
  
  console.log('Weekly Summary:')
  console.log(`Days Logged: ${summary.total_days}`)
  console.log(`Avg Sleep: ${summary.stats.avg_sleep}h`)
  console.log(`Avg Movement: ${summary.stats.avg_movement} min`)
  console.log(`Wins: ${summary.wins.length}`)
  console.log(`Areas to Improve: ${summary.areas_to_improve.length}\n`)
}

// Run all tests
export function runAllTests() {
  console.log('='.repeat(50))
  console.log('BEAUTYCODE ENGINE TESTS')
  console.log('='.repeat(50) + '\n')
  
  testBodyTypeEngine()
  testHabitEngine()
  testInsightEngine()
  
  console.log('='.repeat(50))
  console.log('ALL TESTS COMPLETED')
  console.log('='.repeat(50))
}
