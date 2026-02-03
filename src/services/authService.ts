const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dtcopywriter.ru'

export interface LoginResponse {
  success: boolean
  message: string
  token: string
  expires_at: string
}

export interface LogoutResponse {
  success: boolean
  message: string
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new Error('Введите email и пароль')
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch(`${API_BASE_URL}/webhook/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData: any = {}
        try {
          const text = await response.text()
          errorData = text ? JSON.parse(text) : {}
        } catch {}
        
        if (response.status === 401) {
          throw new Error('Неправильная почта или пароль')
        }
        
        throw new Error(errorData.message || errorData.error || 'Ошибка авторизации')
      }

      const data: LoginResponse = await response.json()
      
      if (!data.success || !data.token) {
        throw new Error(data.message || 'Ошибка авторизации')
      }

      return data
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new Error('Превышено время ожидания ответа от сервера')
      }
      
      throw error
    }
  },

  async logout(token: string): Promise<LogoutResponse> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    try {
      const response = await fetch(`${API_BASE_URL}/webhook/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData: any = {}
        try {
          const text = await response.text()
          errorData = text ? JSON.parse(text) : {}
        } catch {}
        
        throw new Error(errorData.message || errorData.error || 'Ошибка при выходе')
      }

      const data: LogoutResponse = await response.json()
      return data
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      if (error.name === 'AbortError') {
        throw new Error('Превышено время ожидания ответа от сервера')
      }
      
      throw error
    }
  },
}
