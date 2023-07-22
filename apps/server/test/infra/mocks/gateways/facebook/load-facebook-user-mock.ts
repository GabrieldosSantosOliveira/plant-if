import {
  FacebookAccount,
  LoadFacebookUser,
  LoadFacebookUserRequest,
  LoadFacebookUserResponse,
} from '@/domain/contracts/gateways/facebook/load-facebook-user'
import { faker } from '@faker-js/faker'

export class LoadFacebookUserMock implements LoadFacebookUser {
  public accessToken: string
  public user: FacebookAccount | null
  public email: string | null
  public success = true
  async loadUser({
    accessToken,
  }: LoadFacebookUserRequest): Promise<LoadFacebookUserResponse> {
    this.accessToken = accessToken
    this.user = {
      email: this.email || faker.internet.email(),
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      id: faker.string.uuid(),
      picture: faker.internet.avatar(),
    }
    return {
      success: this.success,
      user: this.user,
    }
  }
}
export const makeLoadFacebookUserMock = () => {
  const loadFacebookUserMock = new LoadFacebookUserMock()
  return { loadFacebookUserMock }
}

export class LoadFacebookUserMockWithException implements LoadFacebookUser {
  async loadUser(): Promise<LoadFacebookUserResponse> {
    throw new Error()
  }
}
export const makeLoadFacebookUserMockWithException = () => {
  const loadFacebookUserMockWithException =
    new LoadFacebookUserMockWithException()
  return { loadFacebookUserMockWithException }
}
