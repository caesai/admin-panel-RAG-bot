import { apiRequest } from './api'

export interface TelegramUser {
  id: string
  telegram_id: string
  login: string
  role: string
  is_active: boolean
  created_at: string
}

export interface PaginationInfo {
  page: number
  page_size: number
  total: number
  total_pages: number
}

export interface TelegramUsersResponse {
  data: { json: TelegramUser }[]
  pagination: PaginationInfo
}

export interface Role {
  name: string
  uuid: string
}

export interface RolesResponse {
  data: { json: Role }[]
  pagination: PaginationInfo
}

export interface GenerateTokenResponse {
  token: string
  link: string
}

export const telegramUsersService = {
  async getUsers(page: number = 1, pageSize: number = 20): Promise<{ users: TelegramUser[], pagination: PaginationInfo }> {
    try {
      const response: any = await apiRequest(
        `/webhook/users?page=${page}&page_size=${pageSize}`
      )
      
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Неверный формат ответа от сервера: отсутствует массив data')
      }
      
      const users = response.data.map((item: any) => item.json || item)
      return { 
        users, 
        pagination: response.pagination || { page, page_size: pageSize, total: users.length, total_pages: 1 }
      }
    } catch (error: any) {
      throw error
    }
  },

  async getRoles(): Promise<Role[]> {
    try {
      const response: any = await apiRequest('/webhook/roles')
      
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

  async generateToken(roleId: string): Promise<GenerateTokenResponse> {
    const response = await apiRequest('/webhook/generateToken', {
      method: 'POST',
      body: JSON.stringify({ role_id: roleId }),
    })
    return response
  },

  async updateUserRole(telegramId: string, roleUuid: string): Promise<{ success: boolean }> {
    const response = await apiRequest(
      `/webhook/699c6252-1425-4cbc-8082-c03f7609251a/tg-users/${telegramId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ role: roleUuid }),
      }
    )
    return response
  },

  async deleteUser(telegramId: string): Promise<{ success: boolean }> {
    const response = await apiRequest(
      `/webhook/699c6252-1425-4cbc-8082-c03f7609251a/tg-users/${telegramId}`,
      {
        method: 'DELETE',
      }
    )
    return response
  },
}

