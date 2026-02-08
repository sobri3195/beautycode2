# 🌟 Beautycode - Your Personal Health Operating System

![Beautycode](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/react-19.2.3-61dafb)
![Vite](https://img.shields.io/badge/vite-7.3.1-646cff)
![License](https://img.shields.io/badge/license-ISC-green)

Beautycode adalah AI-powered Health & Aging Operating System yang membantu Anda memahami body type sebagai biological kernel, lalu mengonversinya menjadi sistem kebiasaan harian yang sustainable dalam 90 hari.


## 📘 Business Roadmap

Detail roadmap bisnis terbaru tersedia di: **`BUSINESS_ROADMAP_DETAIL.md`**.

## 🎯 Prinsip Inti

```
Body Type is the Kernel
Habit is the Process
Result is the Output
```

## ✨ Fitur Utama

### 1. **Onboarding & Body Type Profiling**
- ⏱️ Onboarding hanya 5 menit
- 🧬 Identifikasi 4 body types: Red, Blue, Green, Yellow
- 📊 Explainable AI dengan confidence score & reasoning
- 🔒 Data 100% disimpan lokal (localStorage)

### 2. **Body Type Engine**
Rule-based system yang explainable untuk menentukan:
- **Red Type** (Metabolic-Sensitive): Insulin resistance tendency
- **Blue Type** (Stress-Driven): Cortisol-sensitive
- **Green Type** (Inflammation-Prone): Digestive & immune sensitive
- **Yellow Type** (Hormonally-Driven): Cycle-sensitive

### 3. **Habit Engine**
Generate personalized daily habits dalam 5 kategori:
- 😴 **Sleep** - Quality & consistency
- 🥗 **Nutrition** - Body type-specific eating
- 🏃 **Movement** - Exercise yang sesuai
- 🧘 **Recovery** - Rest & regeneration
- 💭 **Emotional** - Stress & self-compassion

### 4. **Daily Tracker**
- ⏱️ Input ≤ 60 detik
- 📝 Track sleep, energy, movement, stress, nutrition
- 🔥 Streak tracking untuk consistency
- 📊 Pattern recognition

### 5. **Insight Engine**
- 💡 Daily insights dengan actionable steps
- 📈 Weekly summary dengan wins & improvement areas
- ⚠️ Risk alerts dengan gentle reminders
- 🎯 Next week focus recommendations

## 🏗️ Arsitektur

### Tech Stack
- **Frontend**: React 19 + Vite 7
- **Routing**: React Router v7
- **Animation**: Framer Motion 12
- **Styling**: CSS Custom Properties
- **State Management**: React Context API
- **Storage**: localStorage (client-side only)
- **Deploy**: Netlify (Static Web App)

### Struktur Folder

```
beautycode/
├── src/
│   ├── components/         # Reusable components
│   │   ├── layout/         # Layout components (AppLayout, BottomNav)
│   │   ├── ui/             # UI primitives (Button, Card)
│   │   └── app/            # App-specific components
│   ├── pages/              # Page components
│   │   ├── home/           # Public website (HomePage)
│   │   └── apps/           # Application pages
│   │       ├── OnboardingPage.jsx
│   │       ├── TodayPage.jsx
│   │       ├── LogPage.jsx
│   │       ├── InsightPage.jsx
│   │       └── ProfilePage.jsx
│   ├── engines/            # Core logic engines
│   │   ├── bodyTypeEngine.js    # Body type calculation
│   │   ├── habitEngine.js       # Habit generation
│   │   └── insightEngine.js     # Insight generation
│   ├── hooks/              # React hooks
│   │   ├── useUser.jsx     # User state management
│   │   └── useHabit.jsx    # Habit tracking management
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   ├── data/               # Static data
│   ├── assets/             # Images, icons
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── netlify.toml            # Netlify deploy config
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/sobri3195/beautycode2.git
cd beautycode2
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

App akan berjalan di `http://localhost:3000`

### Build untuk Production

```bash
npm run build
```

Build output akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment ke Netlify

### Option 1: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 2: Deploy via Git (Recommended)

1. Push code ke GitHub
2. Login ke [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Build settings sudah auto-detect dari `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Netlify akan auto-deploy setiap kali ada push ke branch main.

## 📱 Routing Structure

### Public Website (`/home`)
Landing page dengan:
- Hero section
- How it works
- Body types overview
- Medical disclaimer
- CTA sections

### Application (`/apps`)
Protected routes dengan bottom navigation:
- `/apps/onboarding` - Body type profiling
- `/apps/today` - Dashboard utama
- `/apps/log` - Daily habit logging
- `/apps/insight` - Insights & analytics
- `/apps/profile` - User profile & settings

## 🎨 Design System

### Colors
```css
--color-primary: #6366f1      /* Indigo */
--color-secondary: #f43f5e    /* Rose */
--color-accent: #06b6d4       /* Cyan */
--color-success: #10b981      /* Green */
--color-warning: #f59e0b      /* Amber */
--color-error: #ef4444        /* Red */
```

### Typography
- Font Family: Inter (Google Fonts)
- Mobile-first responsive scaling
- Clear hierarchy

### Animation
- Framer Motion untuk page transitions
- Micro-interactions pada buttons & cards
- Loading states yang smooth
- Bottom nav animations

## 🧪 Body Type Engine Logic

### Rule-Based System

```javascript
// Example rule for Red Type
IF insulin_resistance = high
AND abdominal_fat = yes
AND energy_drop_after_meal = yes
THEN body_type = Red (score +30)
```

### Output Structure
```javascript
{
  primary_body_type: "red",
  secondary_body_type: "blue",  // optional
  confidence_score: 85,          // 0-100
  reasoning: {
    summary: "...",
    primary_factors: ["..."],
    secondary_factors: ["..."],
    explanation: "..."
  }
}
```

## 📊 Data Storage

Semua data disimpan di **localStorage**:
- `beautycode_user` - User profile data
- `beautycode_body_type` - Body type results
- `beautycode_habit_logs` - Daily habit logs
- `beautycode_habits_{date}` - Daily generated habits

**Privacy**: Tidak ada data yang dikirim ke server. Semua processing client-side.

## ⚠️ Medical Disclaimer

**PENTING**: Beautycode adalah decision-support system untuk membangun healthy habits.

❌ **BUKAN**:
- Medical diagnosis
- Pengganti konsultasi dokter
- Rekomendasi obat atau treatment

✅ **ADALAH**:
- Framework untuk memahami body patterns
- Tool untuk habit tracking & insights
- Educational health companion

Selalu konsultasi dengan healthcare professional untuk medical concerns.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License.

## 💬 Support

Untuk pertanyaan atau support:
- Create an issue di GitHub
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- Framer Motion untuk amazing animations
- React team untuk awesome framework
- Vite untuk blazing fast build tool
- Community untuk inspiration & support

---

**Built with 💜 for sustainable health transformation**

© 2024 Beautycode. Your Personal Health Operating System.
