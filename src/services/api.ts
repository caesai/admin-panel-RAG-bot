const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://primary-production-9c58b.up.railway.app'

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
          
          // Только если мы не на странице логина
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
          throw new Error('Сессия истекла. Пожалуйста, войдите снова.')
        }
      } catch (error: any) {
        // Если ошибка парсинга - очищаем всё
        if (error.message !== 'Сессия истекла. Пожалуйста, войдите снова.') {
          localStorage.removeItem('authData')
          localStorage.removeItem('authToken')
          
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
          throw new Error('Ошибка проверки токена. Пожалуйста, войдите снова.')
        }
        throw error
      }
    } else {
      // Нет сохраненных данных авторизации
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
        throw new Error('Требуется авторизация')
      }
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
      // Очищаем всё хранилище при 401
      localStorage.removeItem('authData')
      localStorage.removeItem('authToken')
      
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
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

    // Проверяем, есть ли контент в ответе
    const contentType = response.headers.get('content-type')
    const contentLength = response.headers.get('content-length')
    
    // Если нет контента или контент пустой
    if (contentLength === '0' || response.status === 204) {
      return null
    }
    
    // Если контент не JSON, пытаемся получить текст
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      if (!text || text.trim() === '') {
        return null
      }
      // Пробуем распарсить как JSON
      try {
        return JSON.parse(text)
      } catch {
        // Если не JSON, возвращаем как есть
        return { data: text }
      }
    }

    // Получаем текст ответа
    const text = await response.text()
    
    // Если текст пустой, возвращаем null
    if (!text || text.trim() === '') {
      return null
    }
    
    // Парсим JSON
    let jsonResponse
    try {
      jsonResponse = JSON.parse(text)
    } catch (error) {
      throw new Error('Ошибка парсинга ответа от сервера. Получен невалидный JSON.')
    }
    
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

