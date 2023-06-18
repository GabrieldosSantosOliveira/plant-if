import {
  AuthService,
  AuthServiceAccessToken,
  AuthServiceRefreshToken,
} from '@/interfaces/auth/auth-service'
import { Payload } from '@/interfaces/auth/jwt'

export class AuthServiceMock implements AuthService {
  async generateAccessToken(id: string): Promise<AuthServiceAccessToken> {
    return { accessToken: 'any_access_token' }
  }

  async generateRefreshToken(id: string): Promise<AuthServiceRefreshToken> {
    return { refreshToken: 'any_refresh_token' }
  }

  async generateAccessTokenAndRefreshToken(
    id: string,
  ): Promise<AuthServiceRefreshToken & AuthServiceAccessToken> {
    const { accessToken } = await this.generateAccessToken(id)
    const { refreshToken } = await this.generateRefreshToken(id)
    return { accessToken, refreshToken }
  }

  async decryptAccessToken(accessToken: string): Promise<Payload> {
    return { sub: 'any_sub' }
  }

  async decryptRefreshToken(refreshToken: string): Promise<Payload> {
    return { sub: 'any_sub' }
  }
}
export const makeAuthServiceMock = () => {
  const authServiceMock = new AuthServiceMock()
  return { authServiceMock }
}
