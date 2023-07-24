import {
  CreateUserWithFacebookController,
  CreateUserWithFacebookControllerRequest,
} from '@/presentation/controllers/user/create-user-with-facebook-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeCreateUserWithFacebookUseCaseMock,
  makeCreateUserWithFacebookUseCaseMockWithError,
  makeCreateUserWithFacebookUseCaseMockWithException,
} from '@/test/data/mocks/user/create-user-with-facebook-use-case-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { createUserWithFacebookUseCaseMock } =
    makeCreateUserWithFacebookUseCaseMock()
  const sut = new CreateUserWithFacebookController(
    createUserWithFacebookUseCaseMock,
  )
  return { sut, createUserWithFacebookUseCaseMock }
}
const makeSutWithError = () => {
  const { createUserWithFacebookUseCaseMockWithError } =
    makeCreateUserWithFacebookUseCaseMockWithError()
  const sut = new CreateUserWithFacebookController(
    createUserWithFacebookUseCaseMockWithError,
  )
  return { sut }
}
const makeSutWithException = () => {
  const { createUserWithFacebookUseCaseMockWithException } =
    makeCreateUserWithFacebookUseCaseMockWithException()
  const sut = new CreateUserWithFacebookController(
    createUserWithFacebookUseCaseMockWithException,
  )
  return { sut }
}
const makeRequest = (
  body: Partial<CreateUserWithFacebookControllerRequest> = {},
): HttpRequest<CreateUserWithFacebookControllerRequest, unknown, unknown> => {
  return {
    body: {
      accessToken: 'any_access_token',
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('CreateUserWithFacebookController', () => {
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
  it('should return 500 if CreateUserWithFacebookUseCase throw error', async () => {
    const { sut } = makeSutWithError()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR)
  })
  it('should return 401 if CreateUserWithFacebookUseCase return exception', async () => {
    const { sut } = makeSutWithException()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.UNAUTHORIZED_ERROR)
  })

  it('should call CreateUserWithFacebookUseCase with correct params', async () => {
    const { sut, createUserWithFacebookUseCaseMock } = makeSut()
    const accessToken = faker.lorem.slug()
    const createUserWithFacebookUseCaseMockSpy = jest.spyOn(
      createUserWithFacebookUseCaseMock,
      'handle',
    )
    await sut.handle(makeRequest({ accessToken }))
    expect(createUserWithFacebookUseCaseMockSpy).toHaveBeenCalledWith({
      accessToken,
    })
  })
})
