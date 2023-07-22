import { CreateUserWithFacebookUseCaseImpl } from '@/data/use-cases/user/create-user-with-facebook-use-case-impl'
import { makeGeneratorUUID } from '@/main/factories/infra/gateways/uuid/make-generator-uuid'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
import { makeAuthServiceMock } from '@/test/infra/mocks/auth/auth-service-mock'
import {
  makeLoadFacebookUserMock,
  makeLoadFacebookUserMockWithException,
} from '@/test/infra/mocks/gateways/facebook/load-facebook-user-mock'
import { makeGeneratorUUIDMock } from '@/test/infra/mocks/gateways/uuid/make-generator-uuid'

import { makeUser } from '../../../domain/factories/make-user'
import { makeInMemoryUserRepository } from '../../../infra/mocks/repositories/user/in-memory-user-repository'

const makeSut = () => {
  const { authServiceMock } = makeAuthServiceMock()
  const { loadFacebookUserMock } = makeLoadFacebookUserMock()
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const { generatorUUIDMock } = makeGeneratorUUIDMock()
  const sut = new CreateUserWithFacebookUseCaseImpl(
    loadFacebookUserMock,
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    generatorUUIDMock,
  )
  return { sut, loadFacebookUserMock, inMemoryUserRepository, authServiceMock }
}
const makeSutWithLoadFacebookException = () => {
  const { authServiceMock } = makeAuthServiceMock()
  const { loadFacebookUserMockWithException } =
    makeLoadFacebookUserMockWithException()
  const { inMemoryUserRepository } = makeInMemoryUserRepository()
  const sut = new CreateUserWithFacebookUseCaseImpl(
    loadFacebookUserMockWithException,
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    makeGeneratorUUID(),
  )
  return {
    sut,
    loadFacebookUserMockWithException,
    inMemoryUserRepository,
    authServiceMock,
  }
}
describe('CreateUserWithFacebookUseCaseImpl', () => {
  it('should return accessToken, refreshToken and user if user not exists', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response).toHaveProperty('user')
  })
  it('should return accessToken, refreshToken and user if user already exists', async () => {
    const { sut, inMemoryUserRepository, loadFacebookUserMock } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    loadFacebookUserMock.email = user.email
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
    expect(response).toHaveProperty('user')
  })
  it('should throw if accessToken is not valid', async () => {
    const { sut } = makeSutWithLoadFacebookException()
    await expect(
      sut.handle({ accessToken: 'any_access_token' }),
    ).rejects.toThrow(UnauthorizedException)
  })
})
