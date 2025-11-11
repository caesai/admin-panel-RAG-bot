interface LoginResponse {
  token: string
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    // Фейковая авторизация - принимает любые данные
    await new Promise(resolve => setTimeout(resolve, 500))

    if (!email || !password) {
      throw new Error('Введите email и пароль')
    }

    return {
      token: 'fake-auth-token-' + Date.now(),
    }
  },
}
