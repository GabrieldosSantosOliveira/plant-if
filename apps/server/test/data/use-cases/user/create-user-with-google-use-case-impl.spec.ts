import { CreateUserWithGoogleUseCaseImpl } from '@/data/use-cases/user/create-user-with-google-use-case-impl'
import { makeGeneratorUUID } from '@/main/factories/infra/gateways/uuid/make-generator-uuid'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
import { makeAuthServiceMock } from '@/test/infra/mocks/auth/auth-service-mock'
import {
  makeLoadGoogleUserMock,
  makeLoadGoogleUserMockWithException,
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
const makeSutWithLoadGoogleException = () => {
  const { authServiceMock } = makeAuthServiceMock()
  const { loadGoogleUserMockWithException } =
    makeLoadGoogleUserMockWithException()
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const sut = new CreateUserWithGoogleUseCaseImpl(
    loadGoogleUserMockWithException,
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    makeGeneratorUUID(),
  )
  return {
    sut,
    loadGoogleUserMockWithException,
    inMemoryUserRepository,
    authServiceMock,
  }
}
describe('CreateUserWithGoogleUseCaseImpl', () => {
  it('should return accessToken, refreshToken and user if user not exists', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response).toHaveProperty('user')
  })
  it('should return accessToken, refreshToken and user if user already exists', async () => {
    const { sut, inMemoryUserRepository, loadGoogleUserMock } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    loadGoogleUserMock.email = user.email
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response).toHaveProperty('user')
  })
  it('should throw if accessToken is not valid', async () => {
    const { sut } = makeSutWithLoadGoogleException()
    await expect(
      sut.handle({ accessToken: 'any_access_token' }),
    ).rejects.toThrow(UnauthorizedException)
  })
})
