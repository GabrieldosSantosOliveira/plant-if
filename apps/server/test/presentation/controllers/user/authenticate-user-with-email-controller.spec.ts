import {
  AuthenticateUserWithEmailController,
  AuthenticateUserWithEmailUseCaseRequestBody,
} from '@/presentation/controllers/user/authenticate-user-with-email-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeAuthenticateUserWithEmailUseCaseMock,
  makeAuthenticateUserWithEmailUseCaseMockWithError,
  makeAuthenticateUserWithEmailUseCaseMockWithException,
} from '@/test/data/mocks/user/authenticate-user-with-email-use-case-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { authenticateUserWithEmailUseCaseMock } =
    makeAuthenticateUserWithEmailUseCaseMock()
  const sut = new AuthenticateUserWithEmailController(
    authenticateUserWithEmailUseCaseMock,
  )
  return { sut, authenticateUserWithEmailUseCaseMock }
}
const makeSutWithError = () => {
  const { authenticateUserWithEmailUseCaseMockWithError } =
    makeAuthenticateUserWithEmailUseCaseMockWithError()
  const sut = new AuthenticateUserWithEmailController(
    authenticateUserWithEmailUseCaseMockWithError,
  )
  return { sut }
}
const makeSutWithException = () => {
  const { authenticateUserWithEmailUseCaseWithException } =
    makeAuthenticateUserWithEmailUseCaseMockWithException()
  const sut = new AuthenticateUserWithEmailController(
    authenticateUserWithEmailUseCaseWithException,
  )
  return { sut }
}
const makeRequest = (
  body: Partial<AuthenticateUserWithEmailUseCaseRequestBody> = {},
): HttpRequest<
  AuthenticateUserWithEmailUseCaseRequestBody,
  unknown,
  unknown
> => {
  return {
    body: {
      email: faker.internet.email(),
      password: faker.lorem.words(),
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('AuthenticateUserWithEmailController', () => {
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ email: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 400 if password is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ password: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.OK)
  })
  it('should return 500 if AuthenticateUserWithEmailUseCase throw error', async () => {
    const { sut } = makeSutWithError()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR)
  })
  it('should return 404 if AuthenticateUserWithEmailUseCase return exception', async () => {
    const { sut } = makeSutWithException()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NOT_FOUND)
  })

  it('should call AuthenticateUserWithEmailUseCase with correct params', async () => {
    const { sut, authenticateUserWithEmailUseCaseMock } = makeSut()
    const request = makeRequest()
    const createUserWithEmailUseCaseMockSpy = jest.spyOn(
      authenticateUserWithEmailUseCaseMock,
      'handle',
    )

    await sut.handle(request)
    expect(createUserWithEmailUseCaseMockSpy).toHaveBeenCalledWith(request.body)
  })
})
