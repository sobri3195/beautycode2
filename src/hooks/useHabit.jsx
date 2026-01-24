import { createContext, useContext, useState, useEffect } from 'react'
import { generateDailyHabits } from '../engines/habitEngine'

const HabitContext = createContext()

export function HabitProvider({ children }) {
  const [dailyHabits, setDailyHabits] = useState(null)
  const [habitLogs, setHabitLogs] = useState([])
  const [currentStreak, setCurrentStreak] = useState(0)
  
  useEffect(() => {
    // Load habit logs from localStorage
    const savedLogs = localStorage.getItem('beautycode_habit_logs')
    if (savedLogs) {
      const logs = JSON.parse(savedLogs)
      setHabitLogs(logs)
      calculateStreak(logs)
    }
  }, [])
  
  const loadTodayHabits = (bodyType) => {
    const today = new Date().toISOString().split('T')[0]
    const savedHabits = localStorage.getItem(`beautycode_habits_${today}`)
    
    if (savedHabits) {
      setDailyHabits(JSON.parse(savedHabits))
    } else {
      const habits = generateDailyHabits(bodyType, habitLogs.length)
      setDailyHabits(habits)
      localStorage.setItem(`beautycode_habits_${today}`, JSON.stringify(habits))
    }
  }
  
  const logHabit = (habitData) => {
    const newLog = {
      ...habitData,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString()
    }
    
    const updatedLogs = [...habitLogs, newLog]
    setHabitLogs(updatedLogs)
    localStorage.setItem('beautycode_habit_logs', JSON.stringify(updatedLogs))
    calculateStreak(updatedLogs)
  }
  
  const getTodayLog = () => {
    const today = new Date().toISOString().split('T')[0]
    return habitLogs.find(log => log.date === today)
  }
  
  const updateTodayLog = (logData) => {
    const today = new Date().toISOString().split('T')[0]
    const existingIndex = habitLogs.findIndex(log => log.date === today)
    
    if (existingIndex >= 0) {
      const updatedLogs = [...habitLogs]
      updatedLogs[existingIndex] = {
        ...updatedLogs[existingIndex],
        ...logData,
        updated_at: new Date().toISOString()
      }
      setHabitLogs(updatedLogs)
      localStorage.setItem('beautycode_habit_logs', JSON.stringify(updatedLogs))
    } else {
      logHabit(logData)
    }
  }
  
  const getWeekLogs = () => {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    return habitLogs.filter(log => {
      const logDate = new Date(log.date)
      return logDate >= weekAgo && logDate <= today
    })
  }
  
  const calculateStreak = (logs) => {
    if (logs.length === 0) {
      setCurrentStreak(0)
      return
    }
    
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date))
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    
    for (const log of sortedLogs) {
      const logDate = new Date(log.date)
      logDate.setHours(0, 0, 0, 0)
      
      const diffDays = Math.floor((currentDate - logDate) / (1000 * 60 * 60 * 24))
      
      if (diffDays === streak) {
        streak++
      } else {
        break
      }
    }
    
    setCurrentStreak(streak)
  }
  
  return (
    <HabitContext.Provider
      value={{
        dailyHabits,
        habitLogs,
        currentStreak,
        loadTodayHabits,
        logHabit,
        getTodayLog,
        updateTodayLog,
        getWeekLogs
      }}
    >
      {children}
    </HabitContext.Provider>
  )
}

export function useHabit() {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabit must be used within HabitProvider')
  }
  return context
}
