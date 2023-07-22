import { CreateUserWithGoogleUseCaseImpl } from '@/data/use-cases/user/create-user-with-google-use-case-impl'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { makeGeneratorUUID } from '@/main/factories/infra/gateways/uuid/make-generator-uuid'
import { makeAuthServiceMock } from '@/test/infra/mocks/auth/auth-service-mock'
import {
  makeLoadGoogleUserMock,
  makeLoadGoogleUserMockWithError,
} from '@/test/infra/mocks/gateways/google/load-google-user-mock'
import { makeGeneratorUUIDMock } from '@/test/infra/mocks/gateways/uuid/make-generator-uuid'

import { makeUser } from '../../../domain/factories/make-user'
import { makeInMemoryUserRepository } from '../../../infra/mocks/repositories/user/in-memory-user-repository'

const makeSut = () => {
  const { authServiceMock } = makeAuthServiceMock()
  const { loadGoogleUserMock } = makeLoadGoogleUserMock()
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { generatorUUIDMock } = makeGeneratorUUIDMock()
  const sut = new CreateUserWithGoogleUseCaseImpl(
    loadGoogleUserMock,
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    generatorUUIDMock,
  )
  return { sut, loadGoogleUserMock, inMemoryUserRepository, authServiceMock }
}
const makeSutWithLoadGoogleError = () => {
  const { authServiceMock } = makeAuthServiceMock()
  const { loadGoogleUserMockWithError } = makeLoadGoogleUserMockWithError()
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const sut = new CreateUserWithGoogleUseCaseImpl(
    loadGoogleUserMockWithError,
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    makeGeneratorUUID(),
  )
  return {
    sut,
    loadGoogleUserMockWithError,
    inMemoryUserRepository,
    authServiceMock,
  }
}
describe('CreateUserWithGoogleUseCaseImpl', () => {
  it('should return accessToken, refreshToken and user if user not exists', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response.value).toHaveProperty('accessToken')
    expect(response.value).toHaveProperty('refreshToken')
    expect(response.value).toHaveProperty('user')
  })
  it('should return accessToken, refreshToken and user if user already exists', async () => {
    const { sut, inMemoryUserRepository, loadGoogleUserMock } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    loadGoogleUserMock.email = user.email
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response.value).toHaveProperty('accessToken')
    expect(response.value).toHaveProperty('refreshToken')
    expect(response.value).toHaveProperty('user')
  })
  it('should return exception if accessToken is not valid', async () => {
    const { sut, loadGoogleUserMock } = makeSut()
    loadGoogleUserMock.success = false
    const exception = await sut.handle({ accessToken: 'any_access_token' })
    expect(exception.value).toEqual(new UnauthorizedException())
  })
  it('should throw if LoadGoogleUser throw', async () => {
    const { sut } = makeSutWithLoadGoogleError()
    const error = sut.handle({ accessToken: 'any_access_token' })
    await expect(error).rejects.toThrow()
  })
})
