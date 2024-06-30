import {
  CreateUserWithFacebookController,
  CreateUserWithFacebookControllerRequest,
} from "../../../../src/presentation/controllers/user/create-user-with-facebook-controller";
import { HttpStatusCode } from "../../../../src/presentation/helpers/http/http-status-code";
import { HttpRequest } from "../../../../src/presentation/protocols/http/http-request";
import {
  makeCreateUserWithFacebookUseCaseMock,
  makeCreateUserWithFacebookUseCaseMockWithError,
  makeCreateUserWithFacebookUseCaseMockWithException,
} from "../../../data/mocks/user/create-user-with-facebook-use-case-mock";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { createUserWithFacebookUseCaseMock } =
    makeCreateUserWithFacebookUseCaseMock();
  const sut = new CreateUserWithFacebookController(
    createUserWithFacebookUseCaseMock,
  );
  return { sut, createUserWithFacebookUseCaseMock };
};
const makeSutWithError = () => {
  const { createUserWithFacebookUseCaseMockWithError } =
    makeCreateUserWithFacebookUseCaseMockWithError();
  const sut = new CreateUserWithFacebookController(
    createUserWithFacebookUseCaseMockWithError,
  );
  return { sut };
};
const makeSutWithException = () => {
  const { createUserWithFacebookUseCaseMockWithException } =
    makeCreateUserWithFacebookUseCaseMockWithException();
  const sut = new CreateUserWithFacebookController(
    createUserWithFacebookUseCaseMockWithException,
  );
  return { sut };
};
const makeRequest = (
  body: Partial<CreateUserWithFacebookControllerRequest> = {},
): HttpRequest<CreateUserWithFacebookControllerRequest, unknown, unknown> => {
  return {
    body: {
      accessToken: "any_access_token",
      ...body,
    },
    params: {},
    query: {},
  };
};
describe("CreateUserWithFacebookController", () => {
  it("should return 400 if accessToken not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ accessToken: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 200 if success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.OK);
  });
  it("should throw error if CreateUserWithFacebookUseCase throw error", async () => {
    const { sut } = makeSutWithError();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });
  it("should throw exception if CreateUserWithFacebookUseCase throw exception", async () => {
    const { sut } = makeSutWithException();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });

  it("should call CreateUserWithFacebookUseCase with correct params", async () => {
    const { sut, createUserWithFacebookUseCaseMock } = makeSut();
    const accessToken = mockValues.slug;
    const createUserWithFacebookUseCaseMockSpy = jest.spyOn(
      createUserWithFacebookUseCaseMock,
      "handle",
    );
    await sut.handle(makeRequest({ accessToken }));
    expect(createUserWithFacebookUseCaseMockSpy).toHaveBeenCalledWith({
      accessToken,
    });
  });
});
