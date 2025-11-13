import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/authService'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

interface StoredAuth {
  token: string
  expires_at: string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Проверка токена при загрузке
    checkToken()
  }, [])

  const checkToken = () => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      try {
        const authData: StoredAuth = JSON.parse(savedAuthData)
        
        // Проверяем, не истек ли токен
        const expiresAt = new Date(authData.expires_at)
        const now = new Date()
        
        if (expiresAt > now) {
          setToken(authData.token)
          setIsAuthenticated(true)
          setIsLoading(false)
        } else {
          // Токен истек
          clearAuth()
          setIsLoading(false)
        }
      } catch {
        clearAuth()
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  const clearAuth = () => {
    localStorage.removeItem('authData')
    localStorage.removeItem('authToken') // Старый ключ для обратной совместимости
    setToken(null)
    setIsAuthenticated(false)
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)
      
      const authData: StoredAuth = {
        token: response.token,
        expires_at: response.expires_at,
      }
      
      // Сохраняем данные авторизации
      localStorage.setItem('authData', JSON.stringify(authData))
      // Для обратной совместимости с api.ts
      localStorage.setItem('authToken', response.token)
      
      setToken(response.token)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token)
      }
    } catch (error) {
      // Даже если запрос logout не удался, все равно очищаем локальные данные
      console.error('Logout error:', error)
    } finally {
      clearAuth()
      window.location.href = '/login'
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
