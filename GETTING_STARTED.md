# 🚀 Getting Started - Beautycode

Quick start guide untuk developers yang ingin contribute atau customize Beautycode.

## ⚡ Quick Start (5 menit)

```bash
# 1. Clone repository
git clone https://github.com/sobri3195/beautycode2.git
cd beautycode2

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

Selesai! App sekarang berjalan di development mode.

## 📁 Project Overview

Beautycode adalah AI-powered Health Operating System dengan arsitektur:

```
Frontend Only (React + Vite)
  ↓
Client-Side Processing (Rule-Based Engines)
  ↓
Local Storage (No Backend)
```

## 🏗️ First-Time Setup

### 1. Prerequisites Check

```bash
# Check Node.js version (need 18+)
node --version

# Check npm
npm --version
```

Jika belum punya Node.js: [Download di sini](https://nodejs.org)

### 2. Clone & Install

```bash
git clone https://github.com/sobri3195/beautycode2.git
cd beautycode2
npm install
```

### 3. Understand Structure

```
beautycode2/
├── src/
│   ├── engines/          # ← Business logic di sini
│   ├── pages/            # ← UI pages
│   ├── components/       # ← Reusable components
│   └── hooks/            # ← State management
├── public/               # ← Static files
└── dist/                 # ← Build output (git-ignored)
```

## 💻 Development Workflow

### Run Dev Server

```bash
npm run dev
```

Features:
- ⚡ Hot Module Replacement (HMR)
- 🔄 Instant updates on file save
- 📱 Test di http://localhost:3000

### Build untuk Production

```bash
npm run build
```

Output di `dist/` folder, siap deploy.

### Preview Production Build

```bash
npm run preview
```

Test production build locally.

## 🧪 Test Aplikasi

### Manual Testing Flow

1. **Home Page** (`/home`)
   - ✓ Hero section visible
   - ✓ CTA button works
   - ✓ Disclaimer visible

2. **Onboarding** (`/apps/onboarding`)
   - ✓ Progress bar works
   - ✓ All steps navigable
   - ✓ Body type calculation works
   - ✓ Results page shows

3. **Today Page** (`/apps/today`)
   - ✓ Body type badge shows
   - ✓ Daily habits generated
   - ✓ Insights display

4. **Log Page** (`/apps/log`)
   - ✓ All form fields work
   - ✓ Save button persists data
   - ✓ Data loads on refresh

5. **Insight Page** (`/apps/insight`)
   - ✓ Tabs switchable
   - ✓ Weekly summary shows (after 7 days)
   - ✓ Tips relevant to body type

6. **Profile Page** (`/apps/profile`)
   - ✓ Body type details show
   - ✓ Journey stats accurate
   - ✓ Reset button works

### Test with Sample Data

```javascript
// src/data/sampleData.js
import { 
  SAMPLE_USER_RED_TYPE,
  testBodyTypeEngine 
} from './src/data/sampleData.js'

// Test in browser console
testBodyTypeEngine()
```

## 🎨 Customize & Extend

### Add New Body Type Rule

```javascript
// src/engines/bodyTypeEngine.js

const RULES = {
  // ... existing rules
  
  your_new_rule: {
    check: (data) => {
      return data.some_field === 'some_value'
    },
    score: 25,
    type: 'red',
    reasoning: 'Your explanation here'
  }
}
```

### Add New Habit

```javascript
// src/engines/habitEngine.js

const HABIT_LIBRARY = {
  red: {
    sleep: [
      // ... existing habits
      {
        id: 'sleep_red_new',
        title: 'Your Habit Title',
        description: 'Description',
        why: 'Why this matters',
        action: 'What to do'
      }
    ]
  }
}
```

### Add New Page

1. Create page component:
```javascript
// src/pages/apps/NewPage.jsx
export default function NewPage() {
  return (
    <div className="new-page">
      <h1>New Page</h1>
    </div>
  )
}
```

2. Add route:
```javascript
// src/App.jsx
import NewPage from './pages/apps/NewPage'

<Route path="/apps" element={<AppLayout />}>
  {/* ... existing routes */}
  <Route path="new" element={<NewPage />} />
</Route>
```

3. Add to bottom nav (optional):
```javascript
// src/components/layout/BottomNav.jsx
const NAV_ITEMS = [
  // ... existing items
  {
    path: '/apps/new',
    icon: '🆕',
    label: 'New'
  }
]
```

### Customize Theme

```css
/* src/styles/global.css */

:root {
  /* Change primary color */
  --color-primary: #your-color;
  
  /* Change spacing */
  --spacing-md: 1.5rem;
  
  /* Change border radius */
  --radius-md: 0.75rem;
}
```

## 🐛 Common Issues & Solutions

### Issue: "Module not found"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- --port 3001
```

### Issue: "localStorage is not defined"

**Cause**: Running code di server-side context

**Solution**: Wrap dalam check:
```javascript
if (typeof window !== 'undefined') {
  localStorage.setItem(...)
}
```

### Issue: "Build size too large"

**Solution**:
```bash
# Analyze bundle
npm run build -- --analyze

# See what's taking space
npx vite-bundle-visualizer
```

## 📚 Learn the Codebase

### Key Files to Understand

1. **src/App.jsx** - Routing & providers setup
2. **src/engines/bodyTypeEngine.js** - Rule-based body type logic
3. **src/engines/habitEngine.js** - Habit generation logic
4. **src/hooks/useUser.jsx** - User state management
5. **src/components/layout/BottomNav.jsx** - Navigation component

### Code Flow Examples

**Onboarding Flow:**
```
User fills form
  → OnboardingPage.jsx collects data
  → calculateBodyType(data) in bodyTypeEngine.js
  → Result saved via useUser() hook
  → Stored in localStorage
  → Navigate to /apps/today
```

**Daily Habit Generation:**
```
TodayPage.jsx loads
  → useEffect calls loadTodayHabits()
  → generateDailyHabits() in habitEngine.js
  → Selects habits based on body type
  → Displays on page
```

## 🔧 Development Tools

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

### Browser DevTools

- **React DevTools**: Debug component tree & state
- **Network Tab**: Check bundle sizes
- **Application Tab**: Inspect localStorage
- **Console**: Check for errors

## 📖 Next Steps

1. ✅ Setup complete → Read [README.md](./README.md) untuk feature overview
2. 🏗️ Understand architecture → Read [ARCHITECTURE.md](./ARCHITECTURE.md)
3. 🚀 Ready to deploy → Read [DEPLOYMENT.md](./DEPLOYMENT.md)
4. 💡 Want to contribute → Check issues di GitHub

## 🤝 Need Help?

- 📚 Check [README.md](./README.md) untuk dokumentasi lengkap
- 🏗️ Check [ARCHITECTURE.md](./ARCHITECTURE.md) untuk technical deep-dive
- 🐛 Found a bug? Create an issue di GitHub
- 💬 Questions? Start a discussion di GitHub

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # (Coming soon)
npm run format           # (Coming soon)
npm test                 # (Coming soon)

# Deployment
netlify deploy           # Deploy to Netlify
vercel deploy            # Deploy to Vercel
```

---

**Happy Coding! 🎉**

Built with 💜 by Beautycode Team
