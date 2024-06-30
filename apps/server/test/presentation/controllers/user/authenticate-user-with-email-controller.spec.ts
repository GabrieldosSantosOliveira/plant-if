import {
  AuthenticateUserWithEmailController,
  AuthenticateUserWithEmailUseCaseRequestBody,
} from "../../../../src/presentation/controllers/user/authenticate-user-with-email-controller";
import { HttpStatusCode } from "../../../../src/presentation/helpers/http/http-status-code";
import { HttpRequest } from "../../../../src/presentation/protocols/http/http-request";
import {
  makeAuthenticateUserWithEmailUseCaseMock,
  makeAuthenticateUserWithEmailUseCaseMockWithError,
  makeAuthenticateUserWithEmailUseCaseMockWithException,
} from "../../../data/mocks/user/authenticate-user-with-email-use-case-mock";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { authenticateUserWithEmailUseCaseMock } =
    makeAuthenticateUserWithEmailUseCaseMock();
  const sut = new AuthenticateUserWithEmailController(
    authenticateUserWithEmailUseCaseMock,
  );
  return { sut, authenticateUserWithEmailUseCaseMock };
};
const makeSutWithError = () => {
  const { authenticateUserWithEmailUseCaseMockWithError } =
    makeAuthenticateUserWithEmailUseCaseMockWithError();
  const sut = new AuthenticateUserWithEmailController(
    authenticateUserWithEmailUseCaseMockWithError,
  );
  return { sut };
};
const makeSutWithException = () => {
  const { authenticateUserWithEmailUseCaseWithException } =
    makeAuthenticateUserWithEmailUseCaseMockWithException();
  const sut = new AuthenticateUserWithEmailController(
    authenticateUserWithEmailUseCaseWithException,
  );
  return { sut };
};
const makeRequest = (
  body: Partial<AuthenticateUserWithEmailUseCaseRequestBody> = {},
): HttpRequest<
  AuthenticateUserWithEmailUseCaseRequestBody,
  unknown,
  unknown
> => {
  return {
    body: {
      email: mockValues.email,
      password: mockValues.password,
      ...body,
    },
    params: {},
    query: {},
  };
};
describe("AuthenticateUserWithEmailController", () => {
  it("should return 400 if email is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ email: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 400 if password is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ password: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 200 if success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.OK);
  });
  it("should throw error if AuthenticateUserWithEmailUseCase throw error", async () => {
    const { sut } = makeSutWithError();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });
  it("should throw exception if AuthenticateUserWithEmailUseCase throw exception", async () => {
    const { sut } = makeSutWithException();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });

  it("should call AuthenticateUserWithEmailUseCase with correct params", async () => {
    const { sut, authenticateUserWithEmailUseCaseMock } = makeSut();
    const request = makeRequest();
    const createUserWithEmailUseCaseMockSpy = jest.spyOn(
      authenticateUserWithEmailUseCaseMock,
      "handle",
    );

    await sut.handle(request);
    expect(createUserWithEmailUseCaseMockSpy).toHaveBeenCalledWith(
      request.body,
    );
  });
});
