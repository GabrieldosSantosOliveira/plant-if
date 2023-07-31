import {
  AuthWithGoogleRepository,
  AuthWithGoogleRepositoryResponse,
} from '@/domain/repositories/auth-with-google-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserMapper } from '@/infra/data-source/mappers/user-mapper'
import { Either, left, right } from '@/shared/either'
import { faker } from '@faker-js/faker'

import { makeUserDto } from '../../dtos/make-user-dto'

export class AuthWithGoogleRepositoryMock implements AuthWithGoogleRepository {
  public accessToken = faker.lorem.words()
  public refreshToken = faker.lorem.words()
  public user = UserMapper.toUI(makeUserDto())
  async execute(): Promise<
    Either<Exception, AuthWithGoogleRepositoryResponse>
  > {
    return right({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      user: this.user,
    })
  }
}
export const makeAuthWithGoogleRepositoryMock = () => {
  const authWithGoogleRepositoryMock = new AuthWithGoogleRepositoryMock()
  return { authWithGoogleRepositoryMock }
}
export class AuthWithGoogleRepositoryMockWithException
  implements AuthWithGoogleRepository
{
  async execute(): Promise<
    Either<Exception, AuthWithGoogleRepositoryResponse>
  > {
    return left(new UnexpectedException())
  }
}
export const makeAuthWithGoogleRepositoryMockWithException = () => {
  const authWithGoogleRepositoryMockWithException =
    new AuthWithGoogleRepositoryMockWithException()
  return { authWithGoogleRepositoryMockWithException }
}
export class AuthWithGoogleRepositoryMockWithError
  implements AuthWithGoogleRepository
{
  async execute(): Promise<
    Either<Exception, AuthWithGoogleRepositoryResponse>
  > {
    throw new Error()
  }
}
export const makeAuthWithGoogleRepositoryMockWithError = () => {
  const authWithGoogleRepositoryMockWithError =
    new AuthWithGoogleRepositoryMockWithError()
  return { authWithGoogleRepositoryMockWithError }
}
