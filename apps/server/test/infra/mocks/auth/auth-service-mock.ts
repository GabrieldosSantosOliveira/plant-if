import {
  AuthService,
  AuthServiceAccessToken,
  AuthServiceRefreshToken,
} from '@/data/protocols/auth/auth-service'
import { Payload } from '@/data/protocols/auth/jwt'
import { Either, left, right } from '@/shared/either'

export class AuthServiceMock implements AuthService {
  public responseGenerateAccessToken = 'any_access_token'
  public responseGenerateRefreshToken = 'any_refresh_token'
  public responseDecryptAccessToken = 'any_sub'
  public responseDecryptRefreshToken = 'any_sub'
  async generateAccessToken(): Promise<AuthServiceAccessToken> {
    return { accessToken: this.responseGenerateAccessToken }
  }

  async generateRefreshToken(): Promise<AuthServiceRefreshToken> {
    return { refreshToken: this.responseGenerateRefreshToken }
  }

  async decryptAccessToken(): Promise<Either<Error, Payload>> {
    return right({ sub: this.responseDecryptAccessToken })
  }

  async decryptRefreshToken(): Promise<Either<Error, Payload>> {
    return right({ sub: this.responseDecryptRefreshToken })
  }
}
export const makeAuthServiceMock = () => {
  const authServiceMock = new AuthServiceMock()
  return { authServiceMock }
}
export class AuthServiceMockWithError implements AuthService {
  public responseGenerateAccessToken = 'any_access_token'
  public responseGenerateRefreshToken = 'any_refresh_token'
  async generateAccessToken(): Promise<AuthServiceAccessToken> {
    return { accessToken: this.responseGenerateAccessToken }
  }

  async generateRefreshToken(): Promise<AuthServiceRefreshToken> {
    return { refreshToken: this.responseGenerateRefreshToken }
  }

  async decryptAccessToken(): Promise<Either<Error, Payload>> {
    return left(new Error())
  }

  async decryptRefreshToken(): Promise<Either<Error, Payload>> {
    return left(new Error())
  }
}
export const makeAuthServiceMockWithError = () => {
  const authServiceMockWithError = new AuthServiceMockWithError()
  return { authServiceMockWithError }
}
