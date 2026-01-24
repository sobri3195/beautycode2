import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [bodyType, setBodyType] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('beautycode_user')
    const savedBodyType = localStorage.getItem('beautycode_body_type')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    
    if (savedBodyType) {
      setBodyType(JSON.parse(savedBodyType))
    }
    
    setLoading(false)
  }, [])
  
  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('beautycode_user', JSON.stringify(userData))
  }
  
  const updateBodyType = (bodyTypeData) => {
    setBodyType(bodyTypeData)
    localStorage.setItem('beautycode_body_type', JSON.stringify(bodyTypeData))
  }
  
  const clearUser = () => {
    setUser(null)
    setBodyType(null)
    localStorage.removeItem('beautycode_user')
    localStorage.removeItem('beautycode_body_type')
  }
  
  const isOnboarded = () => {
    return user && bodyType
  }
  
  return (
    <UserContext.Provider
      value={{
        user,
        bodyType,
        loading,
        updateUser,
        updateBodyType,
        clearUser,
        isOnboarded
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
