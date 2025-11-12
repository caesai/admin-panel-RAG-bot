const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://primary-production-9c58b.up.railway.app'
const API_TOKEN = import.meta.env.VITE_API_TOKEN || ''

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    // Проверяем токен и его актуальность
    const savedAuthData = localStorage.getItem('authData')
    let authToken = ''
    
    if (savedAuthData) {
      try {
        const authData = JSON.parse(savedAuthData)
        const expiresAt = new Date(authData.expires_at)
        const now = new Date()
        
        if (expiresAt > now) {
          authToken = authData.token
        } else {
          // Токен истек, очищаем и редиректим
          localStorage.removeItem('authData')
          localStorage.removeItem('authToken')
          window.location.href = '/login'
          throw new Error('Сессия истекла. Пожалуйста, войдите снова.')
        }
      } catch (error) {
        // Если не удалось распарсить, пробуем старый формат
        authToken = localStorage.getItem('authToken') || ''
      }
    } else {
      // Старый формат для обратной совместимости
      authToken = localStorage.getItem('authToken') || ''
    }

    const url = `${API_BASE_URL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }
    
    if (authToken) {
      headers['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`
    }

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers,
    })

    clearTimeout(timeoutId)

    if (response.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
      throw new Error('Сессия истекла. Пожалуйста, войдите снова.')
    }

    if (response.status === 403) {
      let errorText = ''
      let errorData: any = {}
      try {
        errorText = await response.text()
        try {
          errorData = errorText ? JSON.parse(errorText) : {}
        } catch {
          errorData = { message: errorText, error: errorText }
        }
      } catch {}
      const errorMessage = errorData.message || errorData.error || errorText || 'Доступ запрещен. Проверьте правильность токена авторизации в файле .env (VITE_API_TOKEN) или права доступа к данному ресурсу.'
      throw new Error(errorMessage)
    }

    if (response.status === 500 || response.status >= 500) {
      throw new Error('Ошибка сервера. Попробуйте позже.')
    }

    if (!response.ok) {
      let errorData = {}
      try {
        const text = await response.text()
        errorData = text ? JSON.parse(text) : {}
      } catch {}
      const statusText = response.statusText || `Ошибка ${response.status}`
      throw new Error((errorData as any).message || (errorData as any).error || statusText)
    }

    const jsonResponse = await response.json()
    
    if (Array.isArray(jsonResponse) && jsonResponse.length > 0) {
      return jsonResponse[0]
    }
    
    return jsonResponse
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      throw new Error('Превышено время ожидания ответа от сервера')
    }
    
    throw error
  }
}

// Специальная функция для генерации токенов TG, использует VITE_API_TOKEN
export async function apiRequestWithEnvToken(endpoint: string, options: RequestInit = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    const url = `${API_BASE_URL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }
    
    // Используем токен из .env для генерации ссылок TG
    if (API_TOKEN && API_TOKEN.trim()) {
      headers['Authorization'] = API_TOKEN.trim()
    }

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers,
    })

    clearTimeout(timeoutId)

    if (response.status === 401) {
      throw new Error('Неверный токен для генерации ссылок')
    }

    if (response.status === 403) {
      let errorText = ''
      let errorData: any = {}
      try {
        errorText = await response.text()
        try {
          errorData = errorText ? JSON.parse(errorText) : {}
        } catch {
          errorData = { message: errorText, error: errorText }
        }
      } catch {}
      const errorMessage = errorData.message || errorData.error || errorText || 'Доступ запрещен'
      throw new Error(errorMessage)
    }

    if (response.status === 500 || response.status >= 500) {
      throw new Error('Ошибка сервера. Попробуйте позже.')
    }

    if (!response.ok) {
      let errorData = {}
      try {
        const text = await response.text()
        errorData = text ? JSON.parse(text) : {}
      } catch {}
      const statusText = response.statusText || `Ошибка ${response.status}`
      throw new Error((errorData as any).message || (errorData as any).error || statusText)
    }

    const jsonResponse = await response.json()
    
    if (Array.isArray(jsonResponse) && jsonResponse.length > 0) {
      return jsonResponse[0]
    }
    
    return jsonResponse
  } catch (error: any) {
    clearTimeout(timeoutId)
    
    if (error.name === 'AbortError') {
      throw new Error('Превышено время ожидания ответа от сервера')
    }
    
    throw error
  }
}

