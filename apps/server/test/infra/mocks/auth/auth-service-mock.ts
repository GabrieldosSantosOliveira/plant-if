import {
  AuthService,
  AuthServiceAccessToken,
  AuthServiceRefreshToken,
} from '@/interfaces/auth/auth-service'
import { Payload } from '@/interfaces/auth/jwt'

export class AuthServiceMock implements AuthService {
  async generateAccessToken(): Promise<AuthServiceAccessToken> {
    return { accessToken: 'any_access_token' }
  }

  async generateRefreshToken(): Promise<AuthServiceRefreshToken> {
    return { refreshToken: 'any_refresh_token' }
  }

  async generateAccessTokenAndRefreshToken(): Promise<
    AuthServiceRefreshToken & AuthServiceAccessToken
  > {
    const { accessToken } = await this.generateAccessToken()
    const { refreshToken } = await this.generateRefreshToken()
    return { accessToken, refreshToken }
  }

  async decryptAccessToken(): Promise<Payload> {
    return { sub: 'any_sub' }
  }

  async decryptRefreshToken(): Promise<Payload> {
    return { sub: 'any_sub' }
  }
}
export const makeAuthServiceMock = () => {
  const authServiceMock = new AuthServiceMock()
  return { authServiceMock }
}
