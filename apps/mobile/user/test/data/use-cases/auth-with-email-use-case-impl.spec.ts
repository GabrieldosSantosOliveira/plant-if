import { keys } from '@/constants/keys'
import { AuthUserWithEmailUseCaseImpl } from '@/data/use-cases/auth/auth-with-email-use-case-impl'
import { UserUiModel } from '@/domain/ui-model/user-ui-model'
import { AuthWithEmailUseCaseDto } from '@/domain/use-cases/auth-with-email-use-case'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import {
  makeAuthWithEmailRepositoryMock,
  makeAuthWithEmailRepositoryMockWithError,
  makeAuthWithEmailRepositoryMockWithException,
} from '@/test/infra/mocks/data-source/repositories/auth/make-auth-with-email-repository-mock'
import { makeSecureStorageMock } from '@/test/infra/mocks/storage/make-secure-storage-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { secureStorageMock } = makeSecureStorageMock()
  const { authWithEmailRepositoryMock } = makeAuthWithEmailRepositoryMock()
  const sut = new AuthUserWithEmailUseCaseImpl(
    authWithEmailRepositoryMock,
    secureStorageMock,
  )
  return { sut, secureStorageMock, authWithEmailRepositoryMock }
}

const makeSutWithError = () => {
  const { secureStorageMock } = makeSecureStorageMock()
  const { authWithEmailRepositoryMockWithError } =
    makeAuthWithEmailRepositoryMockWithError()
  const sut = new AuthUserWithEmailUseCaseImpl(
    authWithEmailRepositoryMockWithError,
    secureStorageMock,
  )
  return { sut, secureStorageMock, authWithEmailRepositoryMockWithError }
}
const makeSutWithException = () => {
  const { secureStorageMock } = makeSecureStorageMock()
  const { authWithEmailRepositoryMockWithException } =
    makeAuthWithEmailRepositoryMockWithException()
  const sut = new AuthUserWithEmailUseCaseImpl(
    authWithEmailRepositoryMockWithException,
    secureStorageMock,
  )
  return { sut, secureStorageMock, authWithEmailRepositoryMockWithException }
}
const makeRequest = (): AuthWithEmailUseCaseDto => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}
describe('AuthUserWithEmailUseCaseImpl', () => {
  it('should return user ui model if success', async () => {
    const { sut } = makeSut()
    const user = await sut.execute(makeRequest())
    expect(user.value).toBeInstanceOf(UserUiModel)
  })
  it('should save accessToken if success', async () => {
    const { sut, secureStorageMock, authWithEmailRepositoryMock } = makeSut()
    await sut.execute(makeRequest())
    const accessToken = await secureStorageMock.getItem(keys.ACCESS_TOKEN)
    expect(accessToken).toBeTruthy()
    expect(accessToken).toBe(authWithEmailRepositoryMock.accessToken)
  })
  it('should save refreshToken if success', async () => {
    const { sut, secureStorageMock, authWithEmailRepositoryMock } = makeSut()
    await sut.execute(makeRequest())
    const refreshToken = await secureStorageMock.getItem(keys.REFRESH_TOKEN)
    expect(refreshToken).toBeTruthy()
    expect(refreshToken).toBe(authWithEmailRepositoryMock.refreshToken)
  })
  it('should return exception if AuthWithEmailRepository return exception', async () => {
    const { sut } = makeSutWithException()
    const exception = await sut.execute(makeRequest())
    expect(exception.value).toBeInstanceOf(UnexpectedException)
  })
  it('should throw if AuthWithEmailRepository throw', async () => {
    const { sut } = makeSutWithError()
    await expect(sut.execute(makeRequest())).rejects.toThrow()
  })
})
