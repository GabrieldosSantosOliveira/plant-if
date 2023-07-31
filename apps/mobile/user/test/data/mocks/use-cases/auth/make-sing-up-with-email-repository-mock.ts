import {
  SingUpWithEmailRepository,
  SingUpWithEmailRepositoryResponse,
} from '@/domain/repositories/sing-up-with-email-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserMapper } from '@/infra/data-source/mappers/user-mapper'
import { Either, left, right } from '@/shared/either'
import { makeUserDto } from '@/test/infra/mocks/data-source/dtos/make-user-dto'
import { faker } from '@faker-js/faker'

export class SingUpWithEmailRepositoryMock
  implements SingUpWithEmailRepository
{
  public accessToken = faker.lorem.words()
  public refreshToken = faker.lorem.words()
  public user = UserMapper.toUI(makeUserDto())
  async execute(): Promise<
    Either<Exception, SingUpWithEmailRepositoryResponse>
  > {
    return right({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      user: this.user,
    })
  }
}
export const makeSingUpWithEmailRepositoryMock = () => {
  const singUpWithEmailRepositoryMock = new SingUpWithEmailRepositoryMock()
  return { singUpWithEmailRepositoryMock }
}
export class SingUpWithEmailRepositoryMockWithException
  implements SingUpWithEmailRepository
{
  async execute(): Promise<
    Either<Exception, SingUpWithEmailRepositoryResponse>
  > {
    return left(new UnexpectedException())
  }
}
export const makeSingUpWithEmailRepositoryMockWithException = () => {
  const singUpWithEmailRepositoryMockWithException =
    new SingUpWithEmailRepositoryMockWithException()
  return { singUpWithEmailRepositoryMockWithException }
}
export class SingUpWithEmailRepositoryMockWithError
  implements SingUpWithEmailRepository
{
  async execute(): Promise<
    Either<Exception, SingUpWithEmailRepositoryResponse>
  > {
    throw new Error()
  }
}
export const makeSingUpWithEmailRepositoryMockWithError = () => {
  const singUpWithEmailRepositoryMockWithError =
    new SingUpWithEmailRepositoryMockWithError()
  return { singUpWithEmailRepositoryMockWithError }
}
