export interface AuthAppleUser {
  authenticate(code: string): Promise<boolean>
}
