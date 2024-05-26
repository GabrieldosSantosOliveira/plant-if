import {
  CreateUserWithEmailController,
  type CreateUserWithEmailControllerRequest,
} from "@/presentation/controllers/user/create-user-with-email-controller";
import { HttpStatusCode } from "@/presentation/helpers/http/http-status-code";
import { type HttpRequest } from "@/presentation/protocols/http/http-request";
import {
  makeCreateUserWithEmailUseCaseMock,
  makeCreateUserWithEmailUseCaseMockWithError,
  makeCreateUserWithEmailUseCaseMockWithException,
} from "@/test/data/mocks/user/create-user-with-email-use-case-mock";
import { faker } from "@faker-js/faker";

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
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.lorem.words(),
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
  it("should return 500 if CreateUserWithEmailUseCase throw error", async () => {
    const { sut } = makeSutWithError();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.SERVER_ERROR);
  });
  it("should return 401 if CreateUserWithEmailUseCase return exception", async () => {
    const { sut } = makeSutWithException();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatusCode.CONFLICT);
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
