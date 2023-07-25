import {
  ResetPasswordController,
  ResetPasswordControllerRequestBody,
} from '@/presentation/controllers/user/reset-password-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeResetPasswordUseCaseMock,
  makeResetPasswordUseCaseMockWithError,
  makeResetPasswordUseCaseMockWithException,
} from '@/test/data/mocks/user/reset-password-use-case-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { resetPasswordUseCaseMock } = makeResetPasswordUseCaseMock()
  const sut = new ResetPasswordController(resetPasswordUseCaseMock)
  return { sut, resetPasswordUseCaseMock }
}
const makeSutWithError = () => {
  const { resetPasswordUseCaseMockWithError } =
    makeResetPasswordUseCaseMockWithError()
  const sut = new ResetPasswordController(resetPasswordUseCaseMockWithError)
  return { sut }
}
const makeSutWithException = () => {
  const { resetPasswordUseCaseMockWithException } =
    makeResetPasswordUseCaseMockWithException()
  const sut = new ResetPasswordController(resetPasswordUseCaseMockWithException)
  return { sut }
}
const makeRequest = (
  body: Partial<ResetPasswordControllerRequestBody> = {},
): HttpRequest<ResetPasswordControllerRequestBody, unknown, unknown> => {
  return {
    body: {
      email: faker.internet.email(),
      code: faker.lorem.words(),
      resetPassword: faker.lorem.words(),
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('ResetPasswordController', () => {
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ email: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 400 if code is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ code: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 400 if resetPassword is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      makeRequest({ resetPassword: undefined }),
    )
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })

  it('should return 204 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NO_CONTENT)
  })
  it('should return 500 if ResetPasswordUseCase throw error', async () => {
    const { sut } = makeSutWithError()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR)
  })
  it('should return 404 if ResetPasswordUseCase return exception user not found', async () => {
    const { sut } = makeSutWithException()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NOT_FOUND)
  })

  it('should call ResetPasswordUseCase with correct params', async () => {
    const { sut, resetPasswordUseCaseMock } = makeSut()
    const request = makeRequest()
    const resetPasswordUseCaseMockMockSpy = jest.spyOn(
      resetPasswordUseCaseMock,
      'handle',
    )

    await sut.handle(request)
    expect(resetPasswordUseCaseMockMockSpy).toHaveBeenCalledWith(request.body)
  })
})
