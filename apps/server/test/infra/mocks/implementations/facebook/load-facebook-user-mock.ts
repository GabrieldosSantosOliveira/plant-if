import {
  FacebookAccount,
  LoadFacebookUser,
  LoadFacebookUserRequest,
} from '@/app/repositories/facebook/load-facebook-user'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
import { faker } from '@faker-js/faker'

export class LoadFacebookUserMock implements LoadFacebookUser {
  public accessToken: string
  public email: string | null
  async loadUser({
    accessToken,
  }: LoadFacebookUserRequest): Promise<FacebookAccount> {
    this.accessToken = accessToken
    return {
      email: this.email || faker.internet.email(),
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      id: faker.string.uuid(),
      picture: faker.internet.avatar(),
    }
  }
}
export const makeLoadFacebookUserMock = () => {
  const loadFacebookUserMock = new LoadFacebookUserMock()
  return { loadFacebookUserMock }
}

export class LoadFacebookUserMockWithException implements LoadFacebookUser {
  async loadUser(): Promise<FacebookAccount> {
    throw new UnauthorizedException()
  }
}
export const makeLoadFacebookUserMockWithException = () => {
  const loadFacebookUserMockWithException =
    new LoadFacebookUserMockWithException()
  return { loadFacebookUserMockWithException }
}
