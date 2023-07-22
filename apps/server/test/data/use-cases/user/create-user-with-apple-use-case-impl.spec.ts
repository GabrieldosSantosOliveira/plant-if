import { CreateUserWithAppleUseCaseImpl } from '@/data/use-cases/user/create-user-with-apple-use-case-impl'
import { BadRequestException } from '@/domain/use-cases/errors/bad-request-exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { CreateUserWithAppleUseCaseRequest } from '@/domain/use-cases/user/create-user-with-apple-use-case'
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
    expect(response.value).toHaveProperty('accessToken')
    expect(response.value).toHaveProperty('refreshToken')
    expect(response.value).toHaveProperty('user')
  })
  it('should return exception if invalid code is provided', async () => {
    const { sut, authAppleUserMock } = makeSut()
    authAppleUserMock.isAuthenticated = false
    const exception = await sut.handle(makeRequest())
    expect(exception.value).toEqual(new UnauthorizedException())
  })

  it('should return accessToken, refreshToken and user if user already exists', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    const response = await sut.handle(makeRequest({ email: user.email }))
    expect(response.value).toHaveProperty('accessToken')
    expect(response.value).toHaveProperty('refreshToken')
    expect(response.value).toHaveProperty('user')
  })
  it('should return exception if user not exists and firstName and lastName is not provided', async () => {
    const { sut } = makeSut()
    const exception = await sut.handle(
      makeRequest({
        firstName: undefined,
        lastName: undefined,
      }),
    )
    expect(exception.value).toEqual(
      new BadRequestException({
        description:
          'should be provided firstName and lastName if user not exists already',
      }),
    )
  })
  it('should call AuthAppleUser with correct code', async () => {
    const { sut, authAppleUserMock } = makeSut()
    const code = faker.lorem.slug()
    const authAppleUserMockSpy = jest.spyOn(authAppleUserMock, 'authenticate')
    await sut.handle(makeRequest({ code }))
    expect(authAppleUserMockSpy).toHaveBeenCalledWith(code)
  })
  it('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const email = faker.internet.email()
    const inMemoryUserRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      'findByEmail',
    )
    await sut.handle(makeRequest({ email }))
    expect(inMemoryUserRepositorySpy).toHaveBeenCalledWith(email)
  })
  it('should call AuthService with correct id', async () => {
    const { sut, authServiceMock, inMemoryUserRepository } = makeSut()
    const generateAccessTokenMockSpy = jest.spyOn(
      authServiceMock,
      'generateAccessToken',
    )
    const generateRefreshTokenMockSpy = jest.spyOn(
      authServiceMock,
      'generateRefreshToken',
    )
    const email = faker.internet.email()
    await sut.handle(makeRequest({ email }))
    const user = await inMemoryUserRepository.findByEmail(email)
    expect(generateAccessTokenMockSpy).toHaveBeenCalledWith(user?.id)
    expect(generateRefreshTokenMockSpy).toHaveBeenCalledWith(user?.id)
  })
})
