# ⚡ Quick Reference - Beautycode

Cheat sheet untuk developers working on Beautycode.

## 🚀 Essential Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Dependencies
npm install              # Install all dependencies
npm update               # Update dependencies
npm outdated             # Check outdated packages
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app, routing setup |
| `src/main.jsx` | Entry point |
| `src/engines/bodyTypeEngine.js` | Body type calculation |
| `src/engines/habitEngine.js` | Habit generation |
| `src/engines/insightEngine.js` | Insight generation |
| `src/hooks/useUser.jsx` | User state management |
| `src/hooks/useHabit.jsx` | Habit tracking |
| `vite.config.js` | Build configuration |
| `netlify.toml` | Deploy configuration |

## 🎨 Design Tokens

### Colors
```css
--color-primary: #6366f1       /* Indigo */
--color-secondary: #f43f5e     /* Rose */
--color-success: #10b981       /* Green */
--color-warning: #f59e0b       /* Amber */
--color-error: #ef4444         /* Red */
```

### Spacing
```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 1rem       /* 16px */
--spacing-lg: 1.5rem     /* 24px */
--spacing-xl: 2rem       /* 32px */
--spacing-2xl: 3rem      /* 48px */
```

### Border Radius
```css
--radius-sm: 0.375rem    /* 6px */
--radius-md: 0.5rem      /* 8px */
--radius-lg: 0.75rem     /* 12px */
--radius-xl: 1rem        /* 16px */
--radius-full: 9999px    /* Circle */
```

## 🧩 Component Usage

### Button
```jsx
import Button from './components/ui/Button'

<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>

// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
```

### Card
```jsx
import Card from './components/ui/Card'

<Card variant="elevated" padding="lg" hoverable>
  Content here
</Card>

// Variants: default, elevated, bordered
// Padding: sm, md, lg
```

## 🔄 Data Flow

### Save User Data
```javascript
import { useUser } from './hooks/useUser'

const { updateUser, updateBodyType } = useUser()

updateUser({ age: 30, gender: 'female' })
updateBodyType(bodyTypeResult)
```

### Log Daily Habit
```javascript
import { useHabit } from './hooks/useHabit'

const { updateTodayLog } = useHabit()

updateTodayLog({
  sleep_hours: 7.5,
  energy_level: 'high',
  movement_minutes: 30
})
```

### Calculate Body Type
```javascript
import { calculateBodyType } from './engines/bodyTypeEngine'

const result = calculateBodyType(userData)
// result.primary_body_type: 'red' | 'blue' | 'green' | 'yellow'
// result.confidence_score: 0-100
// result.reasoning: { ... }
```

### Generate Habits
```javascript
import { generateDailyHabits } from './engines/habitEngine'

const habits = generateDailyHabits(bodyType, dayNumber, userProgress)
// habits.main_habit
// habits.secondary_habit
// habits.risk_habit
```

## 🎯 Routing

```javascript
// Public
/home                    # Landing page

// App (protected)
/apps/onboarding         # Body type profiling
/apps/today              # Dashboard
/apps/log                # Daily tracker
/apps/insight            # Insights
/apps/profile            # User profile
```

## 💾 localStorage Keys

```javascript
beautycode_user          // User profile data
beautycode_body_type     // Body type results
beautycode_habit_logs    // Array of daily logs
beautycode_habits_YYYY-MM-DD  // Cached daily habits
```

## 🎨 Animation Patterns

### Page Transition
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### List Stagger
```jsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

### Button Interaction
```jsx
<motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.05 }}
>
  Click
</motion.button>
```

## 🔧 Common Tasks

### Add New Page
1. Create `src/pages/apps/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add to BottomNav if needed

### Add New Habit
1. Open `src/engines/habitEngine.js`
2. Find `HABIT_LIBRARY[bodyType][category]`
3. Add habit object with: id, title, description, why, action

### Add New Body Type Rule
1. Open `src/engines/bodyTypeEngine.js`
2. Add to `RULES` object
3. Define: check function, score, type, reasoning

### Customize Theme
1. Open `src/styles/global.css`
2. Modify `:root` variables
3. Changes apply globally

## 🐛 Debugging

### Check localStorage
```javascript
// Browser console
localStorage.getItem('beautycode_user')
localStorage.getItem('beautycode_body_type')
localStorage.getItem('beautycode_habit_logs')
```

### Clear All Data
```javascript
// Browser console
localStorage.clear()
// Then refresh page
```

### Test Engines
```javascript
// Import test functions
import { runAllTests } from './src/data/sampleData.js'

// Run in console
runAllTests()
```

## 📊 Performance

### Bundle Analysis
```bash
npm run build -- --analyze
```

### Check Bundle Size
```bash
ls -lh dist/assets/
```

### Lighthouse Audit
1. Build: `npm run build`
2. Preview: `npm run preview`
3. Open DevTools → Lighthouse
4. Run audit

## 🚀 Deployment

### Netlify (Recommended)
```bash
# Via Git (auto-deploy)
git push origin main

# Via CLI
netlify deploy --prod
```

### Vercel
```bash
vercel --prod
```

### Manual
```bash
npm run build
# Upload dist/ folder
```

## 📚 Documentation Map

| Need | Read |
|------|------|
| Overview | README.md |
| Quick start | GETTING_STARTED.md |
| Architecture | ARCHITECTURE.md |
| Deploy guide | DEPLOYMENT.md |
| Status | PROJECT_STATUS.md |
| Handover | HANDOVER.md |

## 🔗 URLs

```
Local Dev:     http://localhost:3000
Production:    https://your-site.netlify.app
GitHub Repo:   https://github.com/sobri3195/beautycode2
```

## 🎯 Body Types Quick Ref

| Type | Focus | Keywords |
|------|-------|----------|
| 🔴 Red | Metabolic | Insulin, carbs, blood sugar |
| 🔵 Blue | Stress | Cortisol, sleep, recovery |
| 🟢 Green | Inflammation | Gut, digestion, immune |
| 🟡 Yellow | Hormonal | Cycle, mood, fluctuation |

## 📝 Habit Categories

1. **Sleep** - Quality, consistency, environment
2. **Nutrition** - Timing, composition, tracking
3. **Movement** - Type, intensity, frequency
4. **Recovery** - Rest, breathwork, inflammation
5. **Emotional** - Stress, boundaries, compassion

## ⚠️ Remember

- ❌ NO medical diagnosis language
- ❌ NO drug recommendations
- ✅ Decision-support framing only
- ✅ Always explainable
- ✅ Non-judgmental tone
- ✅ Privacy first

## 🆘 Emergency Fixes

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
npx kill-port 3000
npm run dev
```

### Hot Reload Broken
```bash
# Restart dev server
# Or hard refresh browser (Cmd+Shift+R)
```

### localStorage Full
```javascript
// Browser console
localStorage.clear()
```

---

**Quick Ref v1.0** | Built with 💜 by Beautycode Team
