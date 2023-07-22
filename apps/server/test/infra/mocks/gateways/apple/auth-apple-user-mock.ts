import { AuthAppleUser } from '@/domain/contracts/gateways/apple/auth-apple-user'

export class AuthAppleUserMock implements AuthAppleUser {
  isAuthenticated = true
  async authenticate(): Promise<boolean> {
    return this.isAuthenticated
  }
}
export const makeAuthAppleUserMock = () => {
  const authAppleUserMock = new AuthAppleUserMock()
  return { authAppleUserMock }
}
