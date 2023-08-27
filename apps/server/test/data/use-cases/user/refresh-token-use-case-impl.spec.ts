import { RefreshTokenUseCaseImpl } from '@/data/use-cases/user/refresh-token-use-case-impl'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { RefreshTokenUseCaseRequestDto } from '@/domain/use-cases/user/refresh-token-use-case'
import { left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'
import {
  makeAuthServiceMock,
  makeAuthServiceMockWithError,
} from '@/test/infra/mocks/auth/auth-service-mock'
import { makeInMemoryUserRepository } from '@/test/infra/mocks/repositories/user/in-memory-user-repository'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { authServiceMock } = makeAuthServiceMock()
  const sut = new RefreshTokenUseCaseImpl(
    authServiceMock,
    inMemoryUserRepository,
  )
  return { sut, inMemoryUserRepository, authServiceMock }
}
const makeRequest = (): RefreshTokenUseCaseRequestDto => {
  return {
    refreshToken: faker.lorem.words(),
  }
}
const makeSutWithError = () => {
  const { authServiceMockWithError } = makeAuthServiceMockWithError()
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const sut = new RefreshTokenUseCaseImpl(
    authServiceMockWithError,
    inMemoryUserRepository,
  )
  return { sut, inMemoryUserRepository, authServiceMockWithError }
}
describe('RefreshTokenUseCaseImpl', () => {
  it('should return accessToken if success', async () => {
    const { sut, inMemoryUserRepository, authServiceMock } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    authServiceMock.responseDecryptRefreshToken = user.id
    const response = await sut.handle(makeRequest())
    expect(response).toEqual(
      right({
        accessToken: 'any_access_token',
      }),
    )
  })
  it('should return exception user not found if user not found', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeRequest())
    expect(response).toEqual(left(new UserNotFoundException()))
  })
  it('should return unauthorized exception if refreshToken is not valid', async () => {
    const { sut } = makeSutWithError()
    const response = await sut.handle(makeRequest())
    expect(response).toEqual(left(new UnauthorizedException()))
  })
})
