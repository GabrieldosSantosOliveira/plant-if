export interface FacebookAccount {
  id: string
  firstName: string
  lastName: string
  email: string
  picture: string
}
export interface LoadFacebookUserRequest {
  accessToken: string
}
export interface LoadFacebookUser {
  loadUser({ accessToken }: LoadFacebookUserRequest): Promise<FacebookAccount>
}
