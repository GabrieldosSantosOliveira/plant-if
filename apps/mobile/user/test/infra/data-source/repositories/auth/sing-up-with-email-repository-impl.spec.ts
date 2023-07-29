import { SingUpWithEmailRepositoryDto } from '@/domain/repositories/sing-up-with-email-repository'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserAlreadyExistsException } from '@/domain/use-cases/errors/user-already-exists-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { UserMapper } from '@/infra/data-source/mappers/user-mapper'
import { SingUpWithEmailRepositoryImpl } from '@/infra/data-source/repositories/auth/sing-up-with-email-repository-impl'
import { left, right } from '@/shared/either'
import { makeUserDto } from '@/test/infra/mocks/data-source/dtos/make-user-dto'
import {
  makeHttpClientMock,
  makeHttpClientMockWithError,
} from '@/test/infra/mocks/http/make-http-client-mock'
import { faker } from '@faker-js/faker'
const URL = 'any_url'
const makeSut = () => {
  const { httpClientMock } = makeHttpClientMock()
  const sut = new SingUpWithEmailRepositoryImpl(URL, httpClientMock)
  const accessToken = faker.lorem.words()
  const refreshToken = faker.lorem.words()
  const user = makeUserDto()
  httpClientMock.responsePost = {
    data: {
      accessToken,
      refreshToken,
      user,
    },
    statusCode: HttpStatusCode.CREATED,
  }
  return {
    sut,
    httpClientMock,
    user,
    accessToken,
    refreshToken,
  }
}
const makeSutWithError = () => {
  const { httpClientMockWithError } = makeHttpClientMockWithError()
  const sut = new SingUpWithEmailRepositoryImpl(URL, httpClientMockWithError)

  return {
    sut,
    httpClientMockWithError,
  }
}
const makeRequest = (): SingUpWithEmailRepositoryDto => {
  return {
    email: faker.internet.email(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    password: faker.internet.password(),
  }
}
describe('SingUpWithEmailRepositoryImpl', () => {
  it('should return accessToken, refreshToken and user if success', async () => {
    const { sut, accessToken, refreshToken, user } = makeSut()
    const response = await sut.execute(makeRequest())
    expect(response).toEqual(
      right({
        accessToken,
        refreshToken,
        user: UserMapper.toUI(user),
      }),
    )
  })
  it('should return UserAlreadyExistsException if status code 409', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.CONFLICT
    const response = await sut.execute(makeRequest())
    expect(response).toEqual(left(new UserAlreadyExistsException()))
  })
  it('should return UnexpectedException for status code other than 204', async () => {
    const { sut, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.BAD_REQUEST
    const response = await sut.execute(makeRequest())
    expect(response).toEqual(left(new UnexpectedException()))
  })
  it('should throw if HttpClient throw', async () => {
    const { sut } = makeSutWithError()
    await expect(sut.execute(makeRequest())).rejects.toThrow()
  })
  it('should call HttpClient with correct params', async () => {
    const { sut, httpClientMock } = makeSut()
    const httpClientSpy = jest.spyOn(httpClientMock, 'post')
    const request = makeRequest()
    await sut.execute(request)
    expect(httpClientSpy).toHaveBeenCalledWith(URL, {
      body: {
        firstName: request.firstName,
        lastName: request.lastName,
        password: request.password,
        email: request.email,
      },
    })
  })
})
