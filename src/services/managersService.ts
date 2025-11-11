import { apiRequest } from './api'

export interface Manager {
  id: string
  name: string
  role: string
  restaurants: string[]
  password?: string
}

export const managersService = {
  async getManagers() {
    try {
      const response = await apiRequest('/webhook/managers')
      
      if (!response || !response.data || !Array.isArray(response.data)) {
        throw new Error('Неверный формат ответа от сервера: отсутствует массив data')
      }
      
      const data = response.data.map((item: any) => item.json || item)
      return data
    } catch (error: any) {
      throw error
    }
  },

  async addManager(managerData: { name: string; role: string; restaurants: string[]; password: string }) {
    const response = await apiRequest('/webhook/managers', {
      method: 'POST',
      body: JSON.stringify(managerData),
    })
    return response
  },

  async updateManager(id: string, managerData: { name?: string; role?: string; restaurants?: string[] }) {
    const response = await apiRequest(`/webhook/managers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(managerData),
    })
    return response
  },

  async deleteManager(id: string): Promise<void> {
    await apiRequest(`/webhook/managers/${id}`, {
      method: 'DELETE',
    })
  },
}
