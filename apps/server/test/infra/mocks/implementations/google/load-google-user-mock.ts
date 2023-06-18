import {
  GoogleAccount,
  LoadGoogleUser,
  LoadGoogleUserRequest,
} from '@/app/repositories/google/load-google-user'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
import { faker } from '@faker-js/faker'

export class LoadGoogleUserMock implements LoadGoogleUser {
  public accessToken: string
  public email: string | null
  async loadUser({
    accessToken,
  }: LoadGoogleUserRequest): Promise<GoogleAccount> {
    this.accessToken = accessToken
    return {
      email: this.email || faker.internet.email(),
      family_name: faker.person.lastName(),
      given_name: faker.person.firstName(),
      id: faker.string.uuid(),
      picture: faker.internet.avatar(),
    }
  }
}
export const makeLoadGoogleUserMock = () => {
  const loadGoogleUserMock = new LoadGoogleUserMock()
  return { loadGoogleUserMock }
}

export class LoadGoogleUserMockWithException implements LoadGoogleUser {
  async loadUser(): Promise<GoogleAccount> {
    throw new UnauthorizedException()
  }
}
export const makeLoadGoogleUserMockWithException = () => {
  const loadGoogleUserMockWithException = new LoadGoogleUserMockWithException()
  return { loadGoogleUserMockWithException }
}
