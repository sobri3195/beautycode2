import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import BottomNav from './BottomNav'
import './AppLayout.css'

export default function AppLayout() {
  const { isOnboarded, loading } = useUser()
  
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader"></div>
        <p>Loading your health OS...</p>
      </div>
    )
  }
  
  // Redirect to onboarding if not completed
  if (!isOnboarded() && window.location.pathname !== '/apps/onboarding') {
    return <Navigate to="/apps/onboarding" replace />
  }
  
  return (
    <div className="app-layout">
      <main className="app-content">
        <Outlet />
      </main>
      {isOnboarded() && <BottomNav />}
    </div>
  )
}
