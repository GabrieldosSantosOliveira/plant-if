import {
  AuthService,
  AuthServiceAccessToken,
  AuthServiceRefreshToken,
} from '@/data/protocols/auth/auth-service'
import { Payload } from '@/data/protocols/auth/jwt'
import { Either, right } from '@/shared/either'

export class AuthServiceMock implements AuthService {
  async generateAccessToken(): Promise<AuthServiceAccessToken> {
    return { accessToken: 'any_access_token' }
  }

  async generateRefreshToken(): Promise<AuthServiceRefreshToken> {
    return { refreshToken: 'any_refresh_token' }
  }

  async decryptAccessToken(): Promise<Either<Error, Payload>> {
    return right({ sub: 'any_sub' })
  }

  async decryptRefreshToken(): Promise<Either<Error, Payload>> {
    return right({ sub: 'any_sub' })
  }
}
export const makeAuthServiceMock = () => {
  const authServiceMock = new AuthServiceMock()
  return { authServiceMock }
}
