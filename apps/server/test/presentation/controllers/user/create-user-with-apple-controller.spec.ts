import {
  CreateUserWithAppleController,
  CreateUserWithAppleControllerRequest,
} from '@/presentation/controllers/user/create-user-with-apple-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeCreateUserWithAppleUseCaseMock,
  makeCreateUserWithAppleUseCaseMockWithError,
  makeCreateUserWithAppleUseCaseMockWithException,
} from '@/test/data/mocks/user/create-user-with-apple-use-case-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { createUserWithAppleUseCaseMock } =
    makeCreateUserWithAppleUseCaseMock()
  const sut = new CreateUserWithAppleController(createUserWithAppleUseCaseMock)
  return { sut, createUserWithAppleUseCaseMock }
}
const makeSutWithError = () => {
  const { createUserWithAppleUseCaseMockWithError } =
    makeCreateUserWithAppleUseCaseMockWithError()
  const sut = new CreateUserWithAppleController(
    createUserWithAppleUseCaseMockWithError,
  )
  return { sut }
}
const makeSutWithException = () => {
  const { createUserWithAppleUseCaseMockWithException } =
    makeCreateUserWithAppleUseCaseMockWithException()
  const sut = new CreateUserWithAppleController(
    createUserWithAppleUseCaseMockWithException,
  )
  return { sut }
}
const makeRequest = (
  body: Partial<CreateUserWithAppleControllerRequest> = {},
): HttpRequest<CreateUserWithAppleControllerRequest, unknown, unknown> => {
  return {
    body: {
      code: 'any_code',
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('CreateUserWithAppleController', () => {
  it('should return 400 if code is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ code: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ email: undefined }))
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
  })
  it('should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.OK)
  })
  it('should return 500 if CreateUserWithAppleUseCase throw error', async () => {
    const { sut } = makeSutWithError()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR)
  })
  it('should return 401 if CreateUserWithAppleUseCase throw exception', async () => {
    const { sut } = makeSutWithException()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse.statusCode).toBe(HttpStatusCode.UNAUTHORIZED_ERROR)
  })

  it('should call CreateUserWithAppleUseCase with correct params', async () => {
    const { sut, createUserWithAppleUseCaseMock } = makeSut()
    const code = faker.lorem.slug()
    const email = faker.internet.email()
    const lastName = faker.person.lastName()
    const firstName = faker.person.firstName()
    const createUserWithAppleUseCaseMockSpy = jest.spyOn(
      createUserWithAppleUseCaseMock,
      'handle',
    )
    await sut.handle(makeRequest({ code, email, firstName, lastName }))
    expect(createUserWithAppleUseCaseMockSpy).toHaveBeenCalledWith({
      code,
      email,
      firstName,
      lastName,
    })
  })
})
