import { CreateUserWithFacebookUseCaseImpl } from '@/data/use-cases/user/create-user-with-facebook-use-case-impl'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { makeGeneratorUUID } from '@/main/factories/infra/gateways/uuid/make-generator-uuid'
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
    expect(response.value).toHaveProperty('accessToken')
    expect(response.value).toHaveProperty('refreshToken')
    expect(response.value).toHaveProperty('user')
  })
  it('should return accessToken, refreshToken and user if user already exists', async () => {
    const { sut, inMemoryUserRepository, loadFacebookUserMock } = makeSut()
    const user = makeUser()
    await inMemoryUserRepository.create(user)
    loadFacebookUserMock.email = user.email
    const response = await sut.handle({ accessToken: 'any_access_token' })
    expect(response.value).toHaveProperty('accessToken')
    expect(response.value).toHaveProperty('refreshToken')
    expect(response.value).toHaveProperty('user')
  })
  it('should return exception if accessToken is not valid', async () => {
    const { sut, loadFacebookUserMock } = makeSut()
    loadFacebookUserMock.success = false
    const exception = await sut.handle({ accessToken: 'any_access_token' })
    expect(exception.value).toEqual(new UnauthorizedException())
  })
  it('should throw if LoadFacebookUser throw', async () => {
    const { sut } = makeSutWithLoadFacebookException()
    const exception = sut.handle({ accessToken: 'any_access_token' })
    await expect(exception).rejects.toThrow()
  })
})
