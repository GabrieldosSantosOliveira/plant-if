import {
  ForgotPasswordController,
  ForgotPasswordControllerRequestBody,
} from '@/presentation/controllers/user/forgot-password-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeForgotPasswordUseCaseMock,
  makeForgotPasswordUseCaseMockWithError,
  makeForgotPasswordUseCaseMockWithException,
} from '@/test/data/mocks/user/forgot-password-use-case-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { forgotPasswordUseCaseMock } = makeForgotPasswordUseCaseMock()
  const sut = new ForgotPasswordController(forgotPasswordUseCaseMock)
  return { sut, forgotPasswordUseCaseMock }
}
const makeSutWithError = () => {
  const { forgotPasswordUseCaseMockWithError } =
    makeForgotPasswordUseCaseMockWithError()
  const sut = new ForgotPasswordController(forgotPasswordUseCaseMockWithError)
  return { sut }
}
const makeSutWithException = () => {
  const { forgotPasswordUseCaseMockWithException } =
    makeForgotPasswordUseCaseMockWithException()
  const sut = new ForgotPasswordController(
    forgotPasswordUseCaseMockWithException,
  )
  return { sut }
}
const makeRequest = (
  body: Partial<ForgotPasswordControllerRequestBody> = {},
): HttpRequest<ForgotPasswordControllerRequestBody, unknown, unknown> => {
  return {
    body: {
      email: faker.internet.email(),
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('CreateUserWithEmailController', () => {
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ email: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })

  it('should return 204 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NO_CONTENT)
  })
  it('should return 500 if ForgotPasswordUseCase throw error', async () => {
    const { sut } = makeSutWithError()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR)
  })
  it('should return 401 if ForgotPasswordUseCase return exception', async () => {
    const { sut } = makeSutWithException()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NOT_FOUND)
  })

  it('should call ForgotPasswordUseCase with correct params', async () => {
    const { sut, forgotPasswordUseCaseMock } = makeSut()
    const request = makeRequest()
    const createUserWithEmailUseCaseMockSpy = jest.spyOn(
      forgotPasswordUseCaseMock,
      'handle',
    )
    await sut.handle(request)
    expect(createUserWithEmailUseCaseMockSpy).toHaveBeenCalledWith(request.body)
  })
})
