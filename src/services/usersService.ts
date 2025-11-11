import { apiRequest } from './api'

export interface User {
  id: string
  telegram_id: string
  login?: string
  username?: string
  role: string
  is_active: boolean
  created_at: string
}

export interface Role {
  name: string
  uuid: string
}

export interface PaginationInfo {
  page: number
  page_size: number
  total: number
  total_pages: number
}

export interface GenerateTokenResponse {
  token: string
  link: string
}

export const usersService = {
  async getUsers(page: number = 1, pageSize: number = 20) {
    try {
      const response = await apiRequest(`/webhook/users?page=${page}&page_size=${pageSize}`)
      
      if (!response || !response.data || !Array.isArray(response.data)) {
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

  async getRoles() {
    try {
      const response = await apiRequest('/webhook/roles')
      
      if (Array.isArray(response)) {
        return response.map((item: any) => item.json || item)
      }
      
      if (!response) {
        throw new Error('Пустой ответ от сервера')
      }
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.map((item: any) => item.json || item)
      }
      
      throw new Error('Неверный формат ответа от сервера')
    } catch (error: any) {
      throw error
    }
  },

  async updateUserRole(userId: string, newRole: string) {
    const response = await apiRequest(`/webhook/users/${userId}/role`, {
      method: 'POST',
      body: JSON.stringify({ role: newRole }),
    })
    return response
  },

  async generateToken(roleId: string): Promise<GenerateTokenResponse> {
    const response = await apiRequest('/webhook/generateToken', {
      method: 'POST',
      body: JSON.stringify({ role_id: roleId }),
    })
    return response
  },
}
