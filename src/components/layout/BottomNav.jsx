import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import './BottomNav.css'

const NAV_ITEMS = [
  {
    path: '/apps/today',
    icon: '🏠',
    label: 'Today'
  },
  {
    path: '/apps/log',
    icon: '📝',
    label: 'Log'
  },
  {
    path: '/apps/insight',
    icon: '💡',
    label: 'Insight'
  },
  {
    path: '/apps/profile',
    icon: '👤',
    label: 'Profile'
  }
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  className="bottom-nav-icon"
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    y: isActive ? -4 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <span className="bottom-nav-label">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="bottom-nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
