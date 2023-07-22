import { CreateUserWithAppleUseCaseImpl } from '@/data/use-cases/user/create-user-with-apple-use-case-impl'
import { CreateUserWithAppleUseCaseRequest } from '@/domain/use-cases/user/create-user-with-apple'
import { makeUser } from '@/test/domain/factories/make-user'
import { makeAuthServiceMock } from '@/test/infra/mocks/auth/auth-service-mock'
import { makeAuthAppleUserMock } from '@/test/infra/mocks/gateways/apple/auth-apple-user-mock'
import { makeGeneratorUUIDMock } from '@/test/infra/mocks/gateways/uuid/make-generator-uuid'
import { makeInMemoryUserRepository } from '@/test/infra/mocks/repositories/user/in-memory-user-repository'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { authServiceMock } = makeAuthServiceMock()
  const { generatorUUIDMock } = makeGeneratorUUIDMock()
  const { authAppleUserMock } = makeAuthAppleUserMock()
  const sut = new CreateUserWithAppleUseCaseImpl(
    authAppleUserMock,
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    generatorUUIDMock,
  )
  return {
    inMemoryUserRepository,
    authServiceMock,
    generatorUUIDMock,
    authAppleUserMock,
    sut,
  }
}
const makeRequest = (
  request: Partial<CreateUserWithAppleUseCaseRequest> = {},
): CreateUserWithAppleUseCaseRequest => {
  return {
    code: '200',
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    ...request,
  }
}

describe('CreateUserWithAppleUseCaseImpl', () => {
  it('should save user if success', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    await sut.handle(makeRequest({ email: 'any_email' }))
    const userIsSaveInDatabase = await inMemoryUserRepository.findByEmail(
      'any_email',
    )
    expect(userIsSaveInDatabase).toBeTruthy()
  })
  it('should return accessToken, refreshToken and user if success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeRequest())
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response).toHaveProperty('user')
  })
  it('should throw if invalid code is provided', async () => {
    const { sut, authAppleUserMock } = makeSut()
    authAppleUserMock.isAuthenticated = false
    await expect(() => sut.handle(makeRequest())).rejects.toThrow()
  })
  it('should return accessToken, refreshToken and user if user already exists', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    const response = await sut.handle(makeRequest({ email: user.email }))
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response).toHaveProperty('user')
  })
  it('should throw if user not exists and firstName and lastName is not provided', async () => {
    const { sut } = makeSut()
    const response = sut.handle(
      makeRequest({
        firstName: undefined,
        lastName: undefined,
      }),
    )
    await expect(response).rejects.toThrow()
  })
})
