import React, { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  username: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, username: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulated login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      if (email && password.length >= 4) {
        setUser({
          id: "pilot-001",
          email,
          username: email.split("@")[0],
          avatar: undefined,
        })
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulated registration - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email && password.length >= 4 && username) {
        setUser({
          id: "pilot-" + Date.now(),
          email,
          username,
          avatar: undefined,
        })
        setIsLoading(false)
        return true
      }
      setIsLoading(false)
      return false
    } catch (error) {
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
