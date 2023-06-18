import {
  AuthService,
  AuthServiceAccessToken,
  AuthServiceRefreshToken,
} from '@/interfaces/auth/auth-service'
import { Jwt, Payload } from '@/interfaces/auth/jwt'
import { InvalidParamError } from '@/presentation/errors/errors/invalid-param-error'
export interface AuthServiceOptions {
  SECRET_ACCESS_TOKEN: string
  SECRET_REFRESH_TOKEN: string
  EXPIRE_ACCESS_TOKEN: number
  EXPIRE_REFRESH_TOKEN: number
}
export class AuthServiceImpl implements AuthService {
  private readonly options: AuthServiceOptions
  constructor(private readonly jwt: Jwt, options: AuthServiceOptions) {
    if (options.SECRET_ACCESS_TOKEN === options.SECRET_REFRESH_TOKEN) {
      throw new InvalidParamError(
        'SECRET_ACCESS_TOKEN should not be equal SECRET_REFRESH_TOKEN',
      )
    }
    this.options = options
  }

  async decryptAccessToken(accessToken: string): Promise<Payload> {
    return await this.jwt.decrypt(accessToken, {
      secret: this.options.SECRET_ACCESS_TOKEN,
    })
  }

  async decryptRefreshToken(refreshToken: string): Promise<Payload> {
    return this.jwt.decrypt(refreshToken, {
      secret: this.options.SECRET_REFRESH_TOKEN,
    })
  }

  async generateAccessToken(id: string): Promise<AuthServiceAccessToken> {
    const accessToken = await this.jwt.encrypt(id, {
      secret: this.options.SECRET_ACCESS_TOKEN,
      expire: this.options.EXPIRE_ACCESS_TOKEN,
    })
    return { accessToken }
  }

  async generateRefreshToken(id: string): Promise<AuthServiceRefreshToken> {
    const refreshToken = await this.jwt.encrypt(id, {
      secret: this.options.SECRET_REFRESH_TOKEN,
      expire: this.options.EXPIRE_REFRESH_TOKEN,
    })
    return { refreshToken }
  }

  async generateAccessTokenAndRefreshToken(
    id: string,
  ): Promise<AuthServiceRefreshToken & AuthServiceAccessToken> {
    const [{ accessToken }, { refreshToken }] = await Promise.all([
      this.generateAccessToken(id),
      this.generateRefreshToken(id),
    ])
    return { accessToken, refreshToken }
  }
}
