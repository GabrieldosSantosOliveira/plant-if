import {
  IsUserAlreadyExistsController,
  IsUserAlreadyExistsControllerRequestBody,
} from '@/presentation/controllers/user/is-user-already-exists-controller'
import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import {
  makeIsUserAlreadyExistsUseCaseMock,
  makeIsUserAlreadyExistsUseCaseMockWithError,
} from '@/test/data/mocks/user/is-user-already-exists-use-case-impl'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const { isUserAlreadyExistsUseCaseMock } =
    makeIsUserAlreadyExistsUseCaseMock()
  const sut = new IsUserAlreadyExistsController(isUserAlreadyExistsUseCaseMock)
  return { sut, isUserAlreadyExistsUseCaseMock }
}
const makeSutWithError = () => {
  const { isUserAlreadyExistsUseCaseMockWithError } =
    makeIsUserAlreadyExistsUseCaseMockWithError()
  const sut = new IsUserAlreadyExistsController(
    isUserAlreadyExistsUseCaseMockWithError,
  )
  return { sut, isUserAlreadyExistsUseCaseMockWithError }
}

const makeRequest = (
  body: Partial<IsUserAlreadyExistsControllerRequestBody> = {},
): HttpRequest<IsUserAlreadyExistsControllerRequestBody, unknown, unknown> => {
  return {
    body: {
      email: faker.internet.email(),
      ...body,
    },
    params: {},
    query: {},
  }
}
describe('IsUserAlreadyExistsController', () => {
  it('should return 400 if email not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({ email: undefined }))
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

  it('should call IsUserAlreadyExistsUseCase with correct params', async () => {
    const { sut, isUserAlreadyExistsUseCaseMock } = makeSut()
    const email = faker.internet.email()
    const isUserAlreadyExistsUseCaseMockSpy = jest.spyOn(
      isUserAlreadyExistsUseCaseMock,
      'handle',
    )
    await sut.handle(makeRequest({ email }))
    expect(isUserAlreadyExistsUseCaseMockSpy).toHaveBeenCalledWith({
      email,
    })
  })
})
