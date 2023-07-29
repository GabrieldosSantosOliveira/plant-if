import { AccessDeniedException } from '@/domain/use-cases/errors/access-denied-exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { ResetPasswordRepositoryImpl } from '@/infra/data-source/repositories/auth/reset-password-repository-impl'
import { left, right } from '@/shared/either'
import {
  makeHttpClientMock,
  makeHttpClientMockWithError,
} from '@/test/infra/mocks/http/make-http-client-mock'
import { faker } from '@faker-js/faker'
const URL = 'any_access_token'
const makeSut = () => {
  const { httpClientMock } = makeHttpClientMock()
  httpClientMock.responsePost = {
    data: null,
    statusCode: HttpStatusCode.NO_CONTENT,
  }
  const code = faker.lorem.words()
  const resetPassword = faker.internet.password()
  const email = faker.lorem.words()
  const sut = new ResetPasswordRepositoryImpl(URL, httpClientMock)
  return { sut, httpClientMock, code, resetPassword, email }
}
const makeSutWithError = () => {
  const { httpClientMockWithError } = makeHttpClientMockWithError()
  const sut = new ResetPasswordRepositoryImpl(URL, httpClientMockWithError)
  const code = faker.lorem.words()
  const resetPassword = faker.internet.password()
  const email = faker.lorem.words()

  return { sut, httpClientMockWithError, code, resetPassword, email }
}
describe('ResetPasswordRepositoryImpl', () => {
  it('should return null if success', async () => {
    const { sut, code, email, resetPassword } = makeSut()

    const response = await sut.execute({ code, email, resetPassword })
    expect(response).toEqual(right(null))
  })
  it('should return AccessDeniedException if status code 401', async () => {
    const { sut, code, email, resetPassword, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.UNAUTHORIZED_ERROR
    const response = await sut.execute({ code, email, resetPassword })
    expect(response).toEqual(left(new AccessDeniedException()))
  })
  it('should return UserNotFoundException if status code 404', async () => {
    const { sut, code, email, resetPassword, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.NOT_FOUND
    const response = await sut.execute({ code, email, resetPassword })
    expect(response).toEqual(left(new UserNotFoundException()))
  })
  it('should return UnexpectedException for status code other than 204', async () => {
    const { sut, code, email, resetPassword, httpClientMock } = makeSut()
    httpClientMock.responsePost.statusCode = HttpStatusCode.BAD_REQUEST
    const response = await sut.execute({ code, email, resetPassword })
    expect(response).toEqual(left(new UnexpectedException()))
  })
  it('should throw if HttpClient throw', async () => {
    const { sut, code, email, resetPassword } = makeSutWithError()
    await expect(sut.execute({ code, email, resetPassword })).rejects.toThrow()
  })
  it('should call HttpClient with correct params', async () => {
    const { sut, code, email, resetPassword, httpClientMock } = makeSut()
    const httpClientSpy = jest.spyOn(httpClientMock, 'post')
    await sut.execute({ code, email, resetPassword })
    expect(httpClientSpy).toHaveBeenCalledWith(URL, {
      body: {
        code,
        email,
        resetPassword,
      },
    })
  })
})
