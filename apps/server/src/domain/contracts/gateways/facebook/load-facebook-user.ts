export interface FacebookAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}
export interface LoadFacebookUserResponse {
  success: boolean;
  user: FacebookAccount | null;
}
export interface LoadFacebookUserRequest {
  accessToken: string;
}
export interface LoadFacebookUser {
  loadUser({
    accessToken,
  }: LoadFacebookUserRequest): Promise<LoadFacebookUserResponse>;
}
