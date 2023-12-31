import {
  CreateUserWithGoogleController,
  CreateUserWithGoogleControllerRequest,
} from '@/presentation/controllers/user/create-user-with-google-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeCreateUserWithGoogleUseCaseMock,
  makeCreateUserWithGoogleUseCaseMockWithError,
  makeCreateUserWithGoogleUseCaseMockWithException,
} from '@/test/data/mocks/user/create-user-with-google-use-case-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { createUserWithGoogleUseCaseMock } =
    makeCreateUserWithGoogleUseCaseMock()
  const sut = new CreateUserWithGoogleController(
    createUserWithGoogleUseCaseMock,
  )
  return { sut, createUserWithGoogleUseCaseMock }
}
const makeSutWithError = () => {
  const { createUserWithGoogleUseCaseMockWithError } =
    makeCreateUserWithGoogleUseCaseMockWithError()
  const sut = new CreateUserWithGoogleController(
    createUserWithGoogleUseCaseMockWithError,
  )
  return { sut }
}
const makeSutWithException = () => {
  const { createUserWithGoogleUseCaseMockWithException } =
    makeCreateUserWithGoogleUseCaseMockWithException()
  const sut = new CreateUserWithGoogleController(
    createUserWithGoogleUseCaseMockWithException,
  )
  return { sut }
}
const makeRequest = (
  body: Partial<CreateUserWithGoogleControllerRequest> = {},
): HttpRequest<CreateUserWithGoogleControllerRequest, unknown, unknown> => {
  return {
    body: {
      accessToken: 'any_access_token',
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('CreateUserWithGoogleController', () => {
  it('should return 400 if accessToken not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(
      makeRequest({ accessToken: undefined }),
    )
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.OK)
  })
  it('should return 500 if CreateUserWithGoogleUseCase throw error', async () => {
    const { sut } = makeSutWithError()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR)
  })
  it('should return 401 if CreateUserWithGoogleUseCase return exception', async () => {
    const { sut } = makeSutWithException()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.UNAUTHORIZED_ERROR)
  })
  it('should call CreateUserWithGoogleUseCase with correct params', async () => {
    const { sut, createUserWithGoogleUseCaseMock } = makeSut()
    const accessToken = faker.lorem.slug()
    const createUserWithGoogleUseCaseMockSpy = jest.spyOn(
      createUserWithGoogleUseCaseMock,
      'handle',
    )
    await sut.handle(makeRequest({ accessToken }))
    expect(createUserWithGoogleUseCaseMockSpy).toHaveBeenCalledWith({
      accessToken,
    })
  })
})
