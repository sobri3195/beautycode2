export const BODY_TYPE_DEFINITIONS = {
  A: {
    code: 'A',
    type: 'Red Oval',
    core_traits: 'Karismatik, hangat, ekspresif',
    color: 'red',
    shape: 'oval'
  },
  B: {
    code: 'B',
    type: 'Green Square',
    core_traits: 'Kuat, tegas, visioner',
    color: 'green',
    shape: 'square'
  },
  C: {
    code: 'C',
    type: 'Yellow Rectangle',
    core_traits: 'Analitis, sensitif, perfeksionis',
    color: 'yellow',
    shape: 'rectangle'
  },
  D: {
    code: 'D',
    type: 'White Circle',
    core_traits: 'Tenang, empatik, penyayang',
    color: 'white',
    shape: 'circle'
  }
}

export const QUIZ_STRUCTURE = {
  total_questions: 16,
  categories: {
    physical: 8,
    physiological: 3,
    personality: 5
  },
  answer_rules: {
    required_single_answer: true,
    no_scale: true,
    no_multi_select: true,
    valid_answers: ['A', 'B', 'C', 'D']
  }
}

export const QUIZ_QUESTIONS = [
  {
    question_id: 'PT01',
    category: 'physical',
    question: 'Bentuk bahu Anda paling mendekati…',
    options: {
      A: 'Bulat, lembut',
      B: 'Lebar, tegas',
      C: 'Ramping, tulang tampak',
      D: 'Miring, lembut'
    }
  },
  {
    question_id: 'PT02',
    category: 'physical',
    question: 'Struktur rahang Anda terlihat…',
    options: {
      A: 'Membulat dan halus',
      B: 'Kotak dan kuat',
      C: 'Panjang dan tegas',
      D: 'Kecil dan lembut'
    }
  },
  {
    question_id: 'PT03',
    category: 'physical',
    question: 'Bentuk wajah dominan Anda…',
    options: {
      A: 'Oval penuh',
      B: 'Persegi',
      C: 'Panjang/persegi panjang',
      D: 'Bulat'
    }
  },
  {
    question_id: 'PT04',
    category: 'physical',
    question: 'Tampilan tulang tubuh Anda…',
    options: {
      A: 'Tertutup jaringan lembut',
      B: 'Kokoh dan padat',
      C: 'Tampak jelas',
      D: 'Halus dan kecil'
    }
  },
  {
    question_id: 'PT05',
    category: 'physical',
    question: 'Postur saat berdiri biasanya…',
    options: {
      A: 'Relaks dan terbuka',
      B: 'Tegap dan mantap',
      C: 'Cenderung lurus kaku',
      D: 'Lembut dan tenang'
    }
  },
  {
    question_id: 'PT06',
    category: 'physical',
    question: 'Gestur tubuh saat berbicara…',
    options: {
      A: 'Ekspresif dan hangat',
      B: 'Pasti dan terarah',
      C: 'Terukur dan detail',
      D: 'Pelan dan menenangkan'
    }
  },
  {
    question_id: 'PT07',
    category: 'physical',
    question: 'Kesan pertama dari penampilan fisik Anda…',
    options: {
      A: 'Akrab dan menarik',
      B: 'Kuat dan berwibawa',
      C: 'Rapi dan presisi',
      D: 'Lembut dan damai'
    }
  },
  {
    question_id: 'PT08',
    category: 'physical',
    question: 'Ritme gerak tubuh Anda sehari-hari…',
    options: {
      A: 'Dinamis dan luwes',
      B: 'Cepat dan mantap',
      C: 'Terstruktur dan efisien',
      D: 'Stabil dan halus'
    }
  },
  {
    question_id: 'PR01',
    category: 'physiological',
    question: 'Saat kelelahan, respons tubuh Anda paling sering…',
    options: {
      A: 'Tetap berinteraksi untuk recharge',
      B: 'Memaksa lanjut sampai selesai',
      C: 'Overthinking dan sulit berhenti',
      D: 'Menarik diri untuk tenang'
    }
  },
  {
    question_id: 'PR02',
    category: 'physiological',
    question: 'Saat tekanan meningkat, pola napas Anda…',
    options: {
      A: 'Cepat lalu kembali normal',
      B: 'Tegas dan menahan dorongan',
      C: 'Pendek dan terasa di dada',
      D: 'Melambat untuk menenangkan diri'
    }
  },
  {
    question_id: 'PR03',
    category: 'physiological',
    question: 'Setelah aktivitas padat, energi pulih saat…',
    options: {
      A: 'Berkumpul dengan orang dekat',
      B: 'Menyelesaikan target berikutnya',
      C: 'Merapikan dan evaluasi detail',
      D: 'Istirahat hening dan refleksi'
    }
  },
  {
    question_id: 'PS01',
    category: 'personality',
    question: 'Dalam tim, peran alami Anda biasanya…',
    options: {
      A: 'Penyemangat suasana',
      B: 'Pengambil keputusan',
      C: 'Penjaga kualitas',
      D: 'Pendengar dan penengah'
    }
  },
  {
    question_id: 'PS02',
    category: 'personality',
    question: 'Saat menghadapi konflik, Anda cenderung…',
    options: {
      A: 'Mencairkan situasi dengan komunikasi hangat',
      B: 'Langsung ke inti masalah',
      C: 'Menganalisis fakta sebelum bicara',
      D: 'Menenangkan emosi semua pihak'
    }
  },
  {
    question_id: 'PS03',
    category: 'personality',
    question: 'Standar Anda terhadap hasil kerja…',
    options: {
      A: 'Bagus dan berdampak positif',
      B: 'Harus unggul dan jelas',
      C: 'Harus presisi dan minim celah',
      D: 'Harus bermanfaat untuk semua'
    }
  },
  {
    question_id: 'PS04',
    category: 'personality',
    question: 'Cara Anda membangun relasi…',
    options: {
      A: 'Cepat akrab dan ekspresif',
      B: 'Selektif namun loyal',
      C: 'Bertahap lewat kepercayaan',
      D: 'Hangat dan konsisten'
    }
  },
  {
    question_id: 'PS05',
    category: 'personality',
    question: 'Saat membuat keputusan penting, Anda mengandalkan…',
    options: {
      A: 'Intuisi dan koneksi emosional',
      B: 'Visi jangka panjang',
      C: 'Data dan detail',
      D: 'Dampak terhadap keharmonisan'
    }
  }
]
