export interface GoogleAccount {
  id: string
  given_name: string
  family_name: string
  email: string
  picture: string
}
export interface LoadGoogleUserRequest {
  accessToken: string
}
export interface LoadGoogleUser {
  loadUser({ accessToken }: LoadGoogleUserRequest): Promise<GoogleAccount>
}
