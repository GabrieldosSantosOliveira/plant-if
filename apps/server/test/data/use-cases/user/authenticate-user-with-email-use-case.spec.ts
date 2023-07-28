import { AuthenticateUserWithEmailUseCaseImpl } from '@/data/use-cases/user/authenticate-user-with-email-use-case-impl'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { AuthenticateUserWithEmailUseCaseRequest } from '@/domain/use-cases/user/authenticate-user-with-email-use-case'
import { left, right } from '@/shared/either'
import { makeUser } from '@/test/domain/factories/make-user'
import { makeAuthServiceMock } from '@/test/infra/mocks/auth/auth-service-mock'
import { makeHashComparerMock } from '@/test/infra/mocks/cryptography/make-hash-comparer'
import { makeInMemoryUserRepository } from '@/test/infra/mocks/repositories/user/in-memory-user-repository'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { hashComparerMock } = makeHashComparerMock()
  const { authServiceMock } = makeAuthServiceMock()
  const sut = new AuthenticateUserWithEmailUseCaseImpl(
    inMemoryUserRepository,
    hashComparerMock,
    authServiceMock,
  )
  return { sut, authServiceMock, inMemoryUserRepository, hashComparerMock }
}
const makeSutWithUser = async () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { hashComparerMock } = makeHashComparerMock()
  const { authServiceMock } = makeAuthServiceMock()
  const sut = new AuthenticateUserWithEmailUseCaseImpl(
    inMemoryUserRepository,
    hashComparerMock,
    authServiceMock,
  )
  const user = makeUser()
  await inMemoryUserRepository.create(user)
  return {
    sut,
    authServiceMock,
    inMemoryUserRepository,
    hashComparerMock,
    user,
  }
}
const makeCredentials = (
  credentials: Partial<AuthenticateUserWithEmailUseCaseRequest> = {},
): AuthenticateUserWithEmailUseCaseRequest => {
  return {
    email: faker.internet.email(),
    password: faker.lorem.words(),
    ...credentials,
  }
}
describe('AuthenticateUserWithEmailUseCaseImpl', () => {
  it('should return exception if user not found', async () => {
    const { sut } = makeSut()
    const exception = await sut.handle(makeCredentials())
    expect(exception).toEqual(left(new UserNotFoundException()))
  })
  it('should return user, accessToken and refreshToken if success', async () => {
    const { sut, user } = await makeSutWithUser()

    const exception = await sut.handle(
      makeCredentials({ email: user.email, password: user.password }),
    )
    expect(exception).toEqual(
      right({
        user,
        accessToken: 'any_access_token',
        refreshToken: 'any_refresh_token',
      }),
    )
  })
  it('should return exception if password not match', async () => {
    const { sut, user, hashComparerMock } = await makeSutWithUser()
    hashComparerMock.isValid = false
    const exception = await sut.handle(makeCredentials({ email: user.email }))
    expect(exception).toEqual(left(new UnauthorizedException()))
  })
  it('should return exception if user no has password', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeUser()
    user.password = undefined
    await inMemoryUserRepository.create(user)
    const exception = await sut.handle(makeCredentials({ email: user.email }))
    expect(exception).toEqual(left(new UnauthorizedException()))
  })
  it('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, inMemoryUserRepository } = await makeSutWithUser()
    const credentials = makeCredentials()

    const loadUserByEmailRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      'findByEmail',
    )
    await sut.handle(makeCredentials(credentials))
    expect(loadUserByEmailRepositorySpy).toHaveBeenCalledWith(credentials.email)
  })
  it('should call HashComparer with correct password and hash', async () => {
    const { sut, hashComparerMock, user } = await makeSutWithUser()
    const hashComparerSpy = jest.spyOn(hashComparerMock, 'compare')
    const credentials = makeCredentials({
      email: user.email,
      password: user.password,
    })
    await sut.handle(credentials)
    expect(hashComparerSpy).toHaveBeenCalledWith(
      credentials.password,
      user.password,
    )
  })
  it('should call AuthService with correct id', async () => {
    const { sut, authServiceMock, user } = await makeSutWithUser()
    const generateAccessTokenSpy = jest.spyOn(
      authServiceMock,
      'generateAccessToken',
    )
    const generateRefreshTokenSpy = jest.spyOn(
      authServiceMock,
      'generateRefreshToken',
    )
    const credentials = makeCredentials({
      email: user.email,
      password: user.password,
    })
    await sut.handle(credentials)
    expect(generateAccessTokenSpy).toHaveBeenCalledWith(user.id)
    expect(generateRefreshTokenSpy).toHaveBeenCalledWith(user.id)
  })
})
