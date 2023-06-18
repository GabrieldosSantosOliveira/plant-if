import { Payload } from './jwt'

export interface AuthServiceAccessToken {
  accessToken: string
}
export interface AuthServiceRefreshToken {
  refreshToken: string
}
export interface AuthService {
  generateAccessToken(id: string): Promise<AuthServiceAccessToken>
  generateRefreshToken(id: string): Promise<AuthServiceRefreshToken>
  generateAccessTokenAndRefreshToken(
    id: string,
  ): Promise<AuthServiceRefreshToken & AuthServiceAccessToken>
  decryptAccessToken(accessToken: string): Promise<Payload>
  decryptRefreshToken(refreshToken: string): Promise<Payload>
}
