import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { ForgotPasswordRepositoryImpl } from '@/infra/data-source/repositories/auth/forgot-password-repository-impl'
import { left, right } from '@/shared/either'
import {
  makeHttpClientMock,
  makeHttpClientMockWithError,
} from '@/test/infra/mocks/http/make-http-client-mock'
import { faker } from '@faker-js/faker'
const URL = 'any_url'
const makeSut = () => {
  const { httpClientMock } = makeHttpClientMock()
  const sut = new ForgotPasswordRepositoryImpl(URL, httpClientMock)
  httpClientMock.responsePost = {
    data: null,
    statusCode: HttpStatusCode.NO_CONTENT,
  }
  const email = faker.internet.email()
  return { sut, httpClientMock, email }
}
const makeSutWithError = () => {
  const { httpClientMockWithError } = makeHttpClientMockWithError()
  const sut = new ForgotPasswordRepositoryImpl(URL, httpClientMockWithError)
  const email = faker.internet.email()
  return { sut, httpClientMockWithError, email }
}
describe('ForgotPasswordRepositoryImpl', () => {
  it('should return null id success', async () => {
    const { sut, email } = makeSut()
    const response = await sut.execute({ email })
    expect(response).toEqual(right(null))
  })
  it('should return exception UserNotFoundException if status code not found', async () => {
    const { sut, email, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.NOT_FOUND
    const response = await sut.execute({ email })
    expect(response).toEqual(left(new UserNotFoundException()))
  })
  it('should return exception for status code other than 204', async () => {
    const { sut, email, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.BAD_REQUEST
    const response = await sut.execute({ email })
    expect(response).toEqual(left(new UnexpectedException()))
  })
  it('should throw if httpClient throw', async () => {
    const { sut, email } = makeSutWithError()
    await expect(sut.execute({ email })).rejects.toThrow()
  })
  it('should call HttpClient with correct params', async () => {
    const { sut, email, httpClientMock } = makeSut()
    const httpClientSpy = jest.spyOn(httpClientMock, 'post')
    await sut.execute({ email })
    expect(httpClientSpy).toHaveBeenCalledWith(URL, {
      body: {
        email,
      },
    })
  })
})
