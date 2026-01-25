import { motion } from 'framer-motion'
import './Card.css'

export default function Card({ 
  children, 
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  ...props 
}) {
  const className = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    hoverable && 'card-hoverable',
    onClick && 'card-clickable'
  ].filter(Boolean).join(' ')
  
  return (
    <motion.div
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hoverable ? { y: -4, boxShadow: 'var(--shadow-lg)' } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}
