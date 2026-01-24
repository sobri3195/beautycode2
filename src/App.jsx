import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Home Pages
import HomePage from './pages/home/HomePage'

// App Pages
import AppLayout from './components/layout/AppLayout'
import OnboardingPage from './pages/apps/OnboardingPage'
import TodayPage from './pages/apps/TodayPage'
import LogPage from './pages/apps/LogPage'
import InsightPage from './pages/apps/InsightPage'
import ProfilePage from './pages/apps/ProfilePage'

// Providers
import { UserProvider } from './hooks/useUser'
import { HabitProvider } from './hooks/useHabit'

function App() {
  return (
    <UserProvider>
      <HabitProvider>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Website */}
            <Route path="/home" element={<HomePage />} />
            
            {/* Application */}
            <Route path="/apps" element={<AppLayout />}>
              <Route index element={<Navigate to="/apps/today" replace />} />
              <Route path="onboarding" element={<OnboardingPage />} />
              <Route path="today" element={<TodayPage />} />
              <Route path="log" element={<LogPage />} />
              <Route path="insight" element={<InsightPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            {/* Redirect root to home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AnimatePresence>
      </HabitProvider>
    </UserProvider>
  )
}

export default App
