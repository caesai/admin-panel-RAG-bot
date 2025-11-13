import { apiRequest } from './api'

export interface UserRequest {
  id: string
  telegram_id: number
  login: string
  request_text: string
  created_at: string
}

export interface ConfidentialTrigger {
  id: string
  telegram_id: string
  username: string
  request_text: string
  created_at: string
}

export interface ManagerChange {
  id: string
  created_at: string
  timestamp: string
  admin_name: string
  change_type: string
  details: string
}

export interface PaginationInfo {
  page: number
  page_size: number
  total: number
  total_pages: number
}

export const logsService = {
  async getManagerChanges(page: number = 1, pageSize: number = 20) {
    try {
      const response = await apiRequest(`/webhook/logs/manager-changes?page=${page}&page_size=${pageSize}`)
      
      // Если ответ пустой или null, возвращаем пустой массив
      if (!response) {
        return { 
          data: [], 
          pagination: { page, page_size: pageSize, total: 0, total_pages: 0 }
        }
      }
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Неверный формат ответа от сервера: отсутствует массив data')
      }
      
      const data = response.data.map((item: any) => item.json || item)
      return { 
        data, 
        pagination: response.pagination || { page, page_size: pageSize, total: data.length, total_pages: 1 }
      }
    } catch (error: any) {
      throw error
    }
  },

  async getUserRequests(page: number = 1, pageSize: number = 20) {
    try {
      const response = await apiRequest(`/webhook/logs/user-requests?page=${page}&page_size=${pageSize}`)
      
      // Если ответ пустой или null, возвращаем пустой массив
      if (!response) {
        return { 
          data: [], 
          pagination: { page, page_size: pageSize, total: 0, total_pages: 0 }
        }
      }
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Неверный формат ответа от сервера: отсутствует массив data')
      }
      
      const data = response.data.map((item: any) => item.json || item)
      return { 
        data, 
        pagination: response.pagination || { page, page_size: pageSize, total: data.length, total_pages: 1 }
      }
    } catch (error: any) {
      throw error
    }
  },

  async getConfidential(page: number = 1, pageSize: number = 20) {
    try {
      const response = await apiRequest(`/webhook/logs/confidential?page=${page}&page_size=${pageSize}`)
      
      // Если ответ пустой или null, возвращаем пустой массив
      if (!response) {
        return { 
          data: [], 
          pagination: { page, page_size: pageSize, total: 0, total_pages: 0 }
        }
      }
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Неверный формат ответа от сервера: отсутствует массив data')
      }
      
      const data = response.data.map((item: any) => item.json || item)
      return { 
        data, 
        pagination: response.pagination || { page, page_size: pageSize, total: data.length, total_pages: 1 }
      }
    } catch (error: any) {
      throw error
    }
  },
}
