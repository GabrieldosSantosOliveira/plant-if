import {
  ResetPasswordController,
  ResetPasswordControllerRequestBody,
} from "../../../../src/presentation/controllers/user/reset-password-controller";
import { HttpStatusCode } from "../../../../src/presentation/helpers/http/http-status-code";
import { HttpRequest } from "../../../../src/presentation/protocols/http/http-request";
import {
  makeResetPasswordUseCaseMock,
  makeResetPasswordUseCaseMockWithError,
  makeResetPasswordUseCaseMockWithException,
} from "../../../data/mocks/user/reset-password-use-case-mock";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { resetPasswordUseCaseMock } = makeResetPasswordUseCaseMock();
  const sut = new ResetPasswordController(resetPasswordUseCaseMock);
  return { sut, resetPasswordUseCaseMock };
};
const makeSutWithError = () => {
  const { resetPasswordUseCaseMockWithError } =
    makeResetPasswordUseCaseMockWithError();
  const sut = new ResetPasswordController(resetPasswordUseCaseMockWithError);
  return { sut };
};
const makeSutWithException = () => {
  const { resetPasswordUseCaseMockWithException } =
    makeResetPasswordUseCaseMockWithException();
  const sut = new ResetPasswordController(
    resetPasswordUseCaseMockWithException,
  );
  return { sut };
};
const makeRequest = (
  body: Partial<ResetPasswordControllerRequestBody> = {},
): HttpRequest<ResetPasswordControllerRequestBody, unknown, unknown> => {
  return {
    body: {
      email: mockValues.email,
      code: mockValues.slug,
      resetPassword: mockValues.slug,
      ...body,
    },
    params: {},
    query: {},
  };
};
describe("ResetPasswordController", () => {
  it("should return 400 if email is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ email: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 400 if code is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ code: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 400 if resetPassword is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ resetPassword: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it("should return 204 if success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.NO_CONTENT);
  });
  it("should throw error if ResetPasswordUseCase throw error", async () => {
    const { sut } = makeSutWithError();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });
  it("should throw exception if ResetPasswordUseCase throw exception user not found", async () => {
    const { sut } = makeSutWithException();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });

  it("should call ResetPasswordUseCase with correct params", async () => {
    const { sut, resetPasswordUseCaseMock } = makeSut();
    const request = makeRequest();
    const resetPasswordUseCaseMockMockSpy = jest.spyOn(
      resetPasswordUseCaseMock,
      "handle",
    );

    await sut.handle(request);
    expect(resetPasswordUseCaseMockMockSpy).toHaveBeenCalledWith(request.body);
  });
});
