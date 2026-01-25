import { motion } from 'framer-motion'
import './Button.css'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) {
  const className = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    disabled && 'btn-disabled'
  ].filter(Boolean).join(' ')
  
  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
