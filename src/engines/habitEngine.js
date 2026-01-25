// Habit Engine - Generates daily habits based on body type and progress

const HABIT_CATEGORIES = {
  SLEEP: 'sleep',
  NUTRITION: 'nutrition',
  MOVEMENT: 'movement',
  RECOVERY: 'recovery',
  EMOTIONAL: 'emotional'
}

// Habit templates by body type
const HABIT_LIBRARY = {
  red: {
    sleep: [
      {
        id: 'sleep_red_1',
        title: 'Konsisten waktu tidur',
        description: 'Tidur dan bangun di waktu yang sama setiap hari untuk mengatur metabolisme',
        duration: '7-8 jam',
        why: 'Sleep consistency mengatur insulin sensitivity dan metabolisme gula',
        action: 'Set alarm tidur 30 menit sebelum target jam tidur'
      },
      {
        id: 'sleep_red_2',
        title: 'No food 3 jam sebelum tidur',
        description: 'Stop makan 3 jam sebelum tidur untuk menstabilkan gula darah',
        why: 'Memberi waktu tubuh untuk proces makanan dan reset insulin',
        action: 'Jika lapar, minum herbal tea atau air putih saja'
      }
    ],
    nutrition: [
      {
        id: 'nutrition_red_1',
        title: 'Protein-first breakfast',
        description: 'Mulai hari dengan protein tinggi, karbohidrat rendah',
        target: '25-30g protein',
        why: 'Protein di pagi hari menstabilkan gula darah sepanjang hari',
        action: 'Telur, greek yogurt, atau protein shake dengan sayuran'
      },
      {
        id: 'nutrition_red_2',
        title: 'Carb timing',
        description: 'Makan karbohidrat complex hanya saat aktif bergerak',
        why: 'Tubuh lebih baik proces carbs saat insulin sensitivity tinggi',
        action: 'Simpan nasi/roti untuk setelah exercise atau saat aktif'
      },
      {
        id: 'nutrition_red_3',
        title: 'Fiber boost',
        description: 'Tambah serat di setiap makan untuk slow release energy',
        target: '5g+ serat per makan',
        why: 'Serat memperlambat penyerapan gula dan menjaga kenyang lebih lama',
        action: 'Tambah sayuran hijau, chia seeds, atau avocado'
      }
    ],
    movement: [
      {
        id: 'movement_red_1',
        title: 'Post-meal walk',
        description: 'Jalan 10-15 menit setelah makan berat',
        duration: '10-15 menit',
        why: 'Movement setelah makan menurunkan spike gula darah hingga 30%',
        action: 'Set reminder untuk jalan santai setelah lunch/dinner'
      },
      {
        id: 'movement_red_2',
        title: 'Strength training',
        description: 'Latihan beban 2-3x seminggu untuk bangun muscle mass',
        why: 'Muscle = insulin sink. Lebih banyak muscle = lebih baik metabolisme',
        action: 'Bodyweight squats, push-ups, atau resistance band'
      }
    ],
    recovery: [
      {
        id: 'recovery_red_1',
        title: 'Metabolic reset day',
        description: 'Satu hari per minggu dengan aktivitas ringan saja',
        why: 'Memberi waktu sistem metabolik untuk recovery dan rebalance',
        action: 'Yoga gentle, stretching, atau nature walk'
      }
    ],
    emotional: [
      {
        id: 'emotional_red_1',
        title: 'Non-food reward system',
        description: 'Buat reward untuk progress yang bukan makanan',
        why: 'Break emotional connection antara achievement dan food',
        action: 'Spa time, hobby baru, atau quality time dengan orang tersayang'
      }
    ]
  },
  
  blue: {
    sleep: [
      {
        id: 'sleep_blue_1',
        title: 'Wind-down ritual',
        description: 'Rutinitas 30 menit sebelum tidur untuk turunkan cortisol',
        duration: '30 menit',
        why: 'Ritual malam memberi signal ke tubuh bahwa saatnya rest mode',
        action: 'Dim lights, breathing exercise, journaling, atau reading'
      },
      {
        id: 'sleep_blue_2',
        title: 'Sleep sanctuary',
        description: 'Optimalkan environment tidur: gelap, sejuk, quiet',
        why: 'Environment quality directly impact cortisol dan recovery',
        action: 'Blackout curtains, white noise, dan suhu kamar 18-20°C'
      }
    ],
    nutrition: [
      {
        id: 'nutrition_blue_1',
        title: 'Anti-stress nutrition',
        description: 'Prioritas makanan yang support adrenal dan nervous system',
        why: 'Nutrisi tertentu help regulate cortisol dan stress response',
        action: 'Magnesium-rich foods: dark leafy greens, nuts, dark chocolate'
      },
      {
        id: 'nutrition_blue_2',
        title: 'Regular meal timing',
        description: 'Makan di waktu yang konsisten untuk stabilkan cortisol',
        why: 'Irregular eating = stress signal ke tubuh = cortisol spike',
        action: 'Set 3 main meals di waktu yang sama setiap hari'
      }
    ],
    movement: [
      {
        id: 'movement_blue_1',
        title: 'Restorative movement',
        description: 'Prioritas yoga, pilates, atau tai chi over HIIT',
        duration: '20-30 menit',
        why: 'High intensity exercise bisa menambah cortisol jika sudah stressed',
        action: 'Gentle flow yoga atau walking in nature'
      },
      {
        id: 'movement_blue_2',
        title: 'Movement break',
        description: 'Micro-break setiap 90 menit untuk stretch dan breathe',
        why: 'Regular breaks prevent cortisol buildup dari prolonged sitting/stress',
        action: 'Set timer untuk stand, stretch, dan deep breathe'
      }
    ],
    recovery: [
      {
        id: 'recovery_blue_1',
        title: 'Breathwork practice',
        description: '5 menit box breathing atau 4-7-8 breathing',
        why: 'Breathing exercise directly activate parasympathetic system',
        action: 'Inhale 4, hold 4, exhale 4, hold 4. Repeat 5 cycles.'
      },
      {
        id: 'recovery_blue_2',
        title: 'Mandatory rest day',
        description: 'Minimal 1 hari full rest dari semua aktivitas intens',
        why: 'Recovery adalah saat tubuh actually rebuild dan heal',
        action: 'Complete rest atau activities yang truly relax you'
      }
    ],
    emotional: [
      {
        id: 'emotional_blue_1',
        title: 'Boundary practice',
        description: 'Practice saying no dan protect energy',
        why: 'Boundaries prevent stress accumulation dan burnout',
        action: 'Identify 1 thing untuk decline atau delegate hari ini'
      },
      {
        id: 'emotional_blue_2',
        title: 'Gratitude moment',
        description: 'Tulis 3 hal yang bersyukur setiap malam',
        why: 'Gratitude practice rewire brain dari stress mode ke calm mode',
        action: 'Keep gratitude journal di bedside table'
      }
    ]
  },
  
  green: {
    sleep: [
      {
        id: 'sleep_green_1',
        title: 'Gut-healing sleep',
        description: 'Prioritas 7-9 jam tidur untuk gut repair',
        why: 'Gut lining regenerate paling optimal saat deep sleep',
        action: 'Target jam tidur 22:00-06:00 untuk optimal repair'
      }
    ],
    nutrition: [
      {
        id: 'nutrition_green_1',
        title: 'Elimination tracking',
        description: 'Track makanan yang trigger bloating atau discomfort',
        why: 'Identify personal food triggers untuk reduce inflammation',
        action: 'Log food dan symptoms di app untuk pattern recognition'
      },
      {
        id: 'nutrition_green_2',
        title: 'Anti-inflammatory plate',
        description: 'Setiap makan: 50% sayur, colorful, omega-3 rich',
        why: 'Anti-inflammatory foods actively reduce systemic inflammation',
        action: 'Rainbow vegetables, fatty fish, olive oil, berries'
      },
      {
        id: 'nutrition_green_3',
        title: 'Gut-supporting foods',
        description: 'Include fermented foods atau prebiotic daily',
        why: 'Good bacteria help repair gut lining dan reduce inflammation',
        action: 'Yogurt, kimchi, sauerkraut, atau prebiotic supplement'
      }
    ],
    movement: [
      {
        id: 'movement_green_1',
        title: 'Low-impact consistency',
        description: 'Movement yang gentle tapi konsisten untuk lymphatic flow',
        why: 'Lymphatic system butuh movement untuk flush inflammatory markers',
        action: 'Walking, swimming, atau cycling dengan pace comfortable'
      }
    ],
    recovery: [
      {
        id: 'recovery_green_1',
        title: 'Inflammation check-in',
        description: 'Daily body scan untuk notice inflammation patterns',
        why: 'Early detection help you adjust habits sebelum flare up',
        action: 'Morning: notice energy, digestion, pain level, skin'
      },
      {
        id: 'recovery_green_2',
        title: 'Cold therapy',
        description: 'Cold shower atau ice pack untuk reduce inflammation',
        duration: '2-3 menit',
        why: 'Cold exposure reduce inflammatory markers dan support recovery',
        action: 'End shower dengan 30-60 detik cold water'
      }
    ],
    emotional: [
      {
        id: 'emotional_green_1',
        title: 'Stress-inflammation awareness',
        description: 'Notice hubungan antara stress dan physical symptoms',
        why: 'Emotional stress directly trigger inflammatory response',
        action: 'Journal: stress level vs body symptoms correlation'
      }
    ]
  },
  
  yellow: {
    sleep: [
      {
        id: 'sleep_yellow_1',
        title: 'Cycle-aware sleep',
        description: 'Adjust sleep need berdasarkan fase siklus hormonal',
        why: 'Sleep need berbeda di follicular vs luteal phase',
        action: 'Track cycle dan prioritas extra sleep di luteal phase'
      }
    ],
    nutrition: [
      {
        id: 'nutrition_yellow_1',
        title: 'Cycle-based eating',
        description: 'Adjust nutrition berdasarkan fase hormonal',
        why: 'Nutritional needs berbeda setiap fase untuk hormonal balance',
        action: 'Follicular: lighter. Luteal: more calories & comfort foods'
      },
      {
        id: 'nutrition_yellow_2',
        title: 'Blood sugar stability',
        description: 'Balanced meals untuk prevent mood swing',
        why: 'Blood sugar crashes worsen hormonal mood symptoms',
        action: 'Protein + healthy fat + complex carb every meal'
      }
    ],
    movement: [
      {
        id: 'movement_yellow_1',
        title: 'Cycle-synced exercise',
        description: 'Match exercise intensity dengan fase hormonal',
        why: 'Hormones affect energy dan recovery capacity',
        action: 'Follicular: high intensity. Luteal: gentle movement'
      }
    ],
    recovery: [
      {
        id: 'recovery_yellow_1',
        title: 'Cycle tracking',
        description: 'Track cycle symptoms untuk predict dan prepare',
        why: 'Awareness help you plan dan reduce surprise symptoms',
        action: 'Use cycle app untuk track energy, mood, cravings'
      }
    ],
    emotional: [
      {
        id: 'emotional_yellow_1',
        title: 'Hormone-aware self-compassion',
        description: 'Recognize mood changes sebagai hormonal, bukan personality',
        why: 'Self-compassion reduce stress yang worsen hormonal symptoms',
        action: 'Remind yourself: "ini hormones, ini temporary"'
      },
      {
        id: 'emotional_yellow_2',
        title: 'Support system',
        description: 'Communicate cycle needs ke orang terdekat',
        why: 'Support system help manage symptoms dan reduce stress',
        action: 'Share cycle calendar dengan partner atau close friends'
      }
    ]
  }
}

// Generate daily habits
export function generateDailyHabits(bodyType, day, userProgress = {}) {
  const typeLibrary = HABIT_LIBRARY[bodyType.primary_body_type] || HABIT_LIBRARY.red
  
  // Determine which categories to prioritize based on day and progress
  const categories = Object.values(HABIT_CATEGORIES)
  const primaryCategory = categories[day % categories.length]
  
  // Select main habit
  const mainHabitPool = typeLibrary[primaryCategory] || []
  const mainHabit = mainHabitPool[Math.floor(Math.random() * mainHabitPool.length)]
  
  // Select secondary habit from different category
  const secondaryCategories = categories.filter(c => c !== primaryCategory)
  const secondaryCategory = secondaryCategories[Math.floor(Math.random() * secondaryCategories.length)]
  const secondaryHabitPool = typeLibrary[secondaryCategory] || []
  const secondaryHabit = secondaryHabitPool[Math.floor(Math.random() * secondaryHabitPool.length)]
  
  // Determine if there's a warning/risk habit
  const riskHabit = determineRiskHabit(bodyType, userProgress)
  
  return {
    date: new Date().toISOString().split('T')[0],
    main_habit: mainHabit ? {
      ...mainHabit,
      category: primaryCategory,
      priority: 'main'
    } : null,
    secondary_habit: secondaryHabit ? {
      ...secondaryHabit,
      category: secondaryCategory,
      priority: 'secondary'
    } : null,
    risk_habit: riskHabit,
    focus_message: generateFocusMessage(primaryCategory, bodyType.primary_body_type)
  }
}

function determineRiskHabit(bodyType, userProgress) {
  // Check for patterns that need intervention
  const risks = []
  
  // Check sleep consistency
  if (userProgress.sleep_consistency && userProgress.sleep_consistency < 70) {
    risks.push({
      type: 'warning',
      category: 'sleep',
      message: 'Sleep consistency Anda di bawah target',
      suggestion: 'Tidur di waktu yang sama sangat critical untuk body type Anda',
      action: 'Set alarm untuk wind-down routine malam ini'
    })
  }
  
  // Check nutrition tracking
  if (userProgress.days_logged && userProgress.days_logged < 3) {
    risks.push({
      type: 'reminder',
      category: 'tracking',
      message: 'Tracking masih minimal',
      suggestion: 'Konsistensi tracking membantu identify patterns',
      action: 'Commit untuk log meals hari ini'
    })
  }
  
  return risks.length > 0 ? risks[0] : null
}

function generateFocusMessage(category, bodyType) {
  const messages = {
    sleep: {
      red: 'Hari ini fokus pada sleep quality untuk metabolic reset',
      blue: 'Priority: sleep untuk lower cortisol dan recovery',
      green: 'Gut healing happens during sleep - make it count',
      yellow: 'Align sleep dengan hormonal needs Anda'
    },
    nutrition: {
      red: 'Nutrition focus: stable blood sugar sepanjang hari',
      blue: 'Eat untuk support adrenal dan calm nervous system',
      green: 'Choose anti-inflammatory foods untuk gut healing',
      yellow: 'Match nutrition dengan fase hormonal cycle'
    },
    movement: {
      red: 'Movement untuk optimize insulin sensitivity',
      blue: 'Gentle movement untuk balance, bukan exhaust',
      green: 'Move untuk lymphatic flow dan reduce inflammation',
      yellow: 'Exercise yang align dengan energy level hari ini'
    },
    recovery: {
      red: 'Recovery day untuk metabolic rebalance',
      blue: 'Deep recovery untuk nervous system reset',
      green: 'Inflammation management adalah priority',
      yellow: 'Honor what your body needs dalam fase ini'
    },
    emotional: {
      red: 'Build healthy relationship dengan food dan body',
      blue: 'Stress management = health management',
      green: 'Emotional stress impacts physical inflammation',
      yellow: 'Self-compassion untuk hormonal fluctuations'
    }
  }
  
  return messages[category][bodyType] || 'Focus on building sustainable habits'
}

// Get habit by ID
export function getHabitById(habitId) {
  for (const type in HABIT_LIBRARY) {
    for (const category in HABIT_LIBRARY[type]) {
      const found = HABIT_LIBRARY[type][category].find(h => h.id === habitId)
      if (found) return { ...found, category, bodyType: type }
    }
  }
  return null
}

export { HABIT_CATEGORIES, HABIT_LIBRARY }
