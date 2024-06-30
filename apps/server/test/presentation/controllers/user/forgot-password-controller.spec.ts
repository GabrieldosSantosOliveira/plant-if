import {
  ForgotPasswordController,
  ForgotPasswordControllerRequestBody,
} from "../../../../src/presentation/controllers/user/forgot-password-controller";
import { HttpStatusCode } from "../../../../src/presentation/helpers/http/http-status-code";
import { HttpRequest } from "../../../../src/presentation/protocols/http/http-request";
import {
  makeForgotPasswordUseCaseMock,
  makeForgotPasswordUseCaseMockWithError,
  makeForgotPasswordUseCaseMockWithException,
} from "../../../data/mocks/user/forgot-password-use-case-mock";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { forgotPasswordUseCaseMock } = makeForgotPasswordUseCaseMock();
  const sut = new ForgotPasswordController(forgotPasswordUseCaseMock);
  return { sut, forgotPasswordUseCaseMock };
};
const makeSutWithError = () => {
  const { forgotPasswordUseCaseMockWithError } =
    makeForgotPasswordUseCaseMockWithError();
  const sut = new ForgotPasswordController(forgotPasswordUseCaseMockWithError);
  return { sut };
};
const makeSutWithException = () => {
  const { forgotPasswordUseCaseMockWithException } =
    makeForgotPasswordUseCaseMockWithException();
  const sut = new ForgotPasswordController(
    forgotPasswordUseCaseMockWithException,
  );
  return { sut };
};
const makeRequest = (
  body: Partial<ForgotPasswordControllerRequestBody> = {},
): HttpRequest<ForgotPasswordControllerRequestBody, unknown, unknown> => {
  return {
    body: {
      email: mockValues.email,
      ...body,
    },
    params: {},
    query: {},
  };
};
describe("CreateUserWithEmailController", () => {
  it("should return 400 if email is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ email: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it("should return 204 if success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NO_CONTENT);
  });
  it("should throw exception if ForgotPasswordUseCase throw error", async () => {
    const { sut } = makeSutWithError();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });
  it("should throw exception if ForgotPasswordUseCase throw exception", async () => {
    const { sut } = makeSutWithException();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });

  it("should call ForgotPasswordUseCase with correct params", async () => {
    const { sut, forgotPasswordUseCaseMock } = makeSut();
    const request = makeRequest();
    const createUserWithEmailUseCaseMockSpy = jest.spyOn(
      forgotPasswordUseCaseMock,
      "handle",
    );
    await sut.handle(request);
    expect(createUserWithEmailUseCaseMockSpy).toHaveBeenCalledWith(
      request.body,
    );
  });
});
