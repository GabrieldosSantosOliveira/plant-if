import {
  CreateUserWithEmailController,
  CreateUserWithEmailControllerRequest,
} from "../../../../src/presentation/controllers/user/create-user-with-email-controller";
import { HttpStatusCode } from "../../../../src/presentation/helpers/http/http-status-code";
import { HttpRequest } from "../../../../src/presentation/protocols/http/http-request";
import {
  makeCreateUserWithEmailUseCaseMock,
  makeCreateUserWithEmailUseCaseMockWithError,
  makeCreateUserWithEmailUseCaseMockWithException,
} from "../../../data/mocks/user/create-user-with-email-use-case-mock";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { createUserWithEmailUseCaseMock } =
    makeCreateUserWithEmailUseCaseMock();
  const sut = new CreateUserWithEmailController(createUserWithEmailUseCaseMock);
  return { sut, createUserWithEmailUseCaseMock };
};
const makeSutWithError = () => {
  const { createUserWithEmailUseCaseMockWithError } =
    makeCreateUserWithEmailUseCaseMockWithError();
  const sut = new CreateUserWithEmailController(
    createUserWithEmailUseCaseMockWithError,
  );
  return { sut };
};
const makeSutWithException = () => {
  const { createUserWithEmailUseCaseMockWithException } =
    makeCreateUserWithEmailUseCaseMockWithException();
  const sut = new CreateUserWithEmailController(
    createUserWithEmailUseCaseMockWithException,
  );
  return { sut };
};
const makeRequest = (
  body: Partial<CreateUserWithEmailControllerRequest> = {},
): HttpRequest<CreateUserWithEmailControllerRequest, unknown, unknown> => {
  return {
    body: {
      email: mockValues.email,
      firstName: mockValues.firstName,
      lastName: mockValues.lastName,
      password: mockValues.password,
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
  it("should return 400 if password is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ password: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 400 if lastName is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ lastName: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 400 if firstName is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ firstName: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
  it("should return 201 if success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.CREATED);
  });
  it("should throw error if CreateUserWithEmailUseCase throw error", async () => {
    const { sut } = makeSutWithError();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });
  it("should throw exception if CreateUserWithEmailUseCase throw exception", async () => {
    const { sut } = makeSutWithException();
    await expect(sut.handle(makeRequest())).rejects.toThrow();
  });

  it("should call CreateUserWithEmailUseCase with correct params", async () => {
    const { sut, createUserWithEmailUseCaseMock } = makeSut();
    const request = makeRequest();
    const createUserWithEmailUseCaseMockSpy = jest.spyOn(
      createUserWithEmailUseCaseMock,
      "handle",
    );

    await sut.handle(request);
    expect(createUserWithEmailUseCaseMockSpy).toHaveBeenCalledWith(
      request.body,
    );
  });
});
