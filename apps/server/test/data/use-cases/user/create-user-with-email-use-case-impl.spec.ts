import { CreateUserWithEmailUseCaseImpl } from "@/data/use-cases/user/create-user-with-email-use-case-impl";
import { UserAlreadyExistsException } from "@/domain/use-cases/errors/user-already-exists-exception";
import { CreateUserWithEmailUseCaseRequest } from "@/domain/use-cases/user/create-user-with-email-use-case";
import { makeAuthServiceMock } from "@/test/infra/mocks/auth/auth-service-mock";
import { makeHasherMock } from "@/test/infra/mocks/cryptography/make-hasher-mock";
import { makeGeneratorUUIDMock } from "@/test/infra/mocks/gateways/uuid/make-generator-uuid";
import { faker } from "@faker-js/faker";

import { makeUser } from "../../../domain/factories/make-user";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";

const makeSut = () => {
  const { authServiceMock } = makeAuthServiceMock();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { generatorUUIDMock } = makeGeneratorUUIDMock();
  const { hasherMock } = makeHasherMock();
  const sut = new CreateUserWithEmailUseCaseImpl(
    inMemoryUserRepository,
    authServiceMock,
    inMemoryUserRepository,
    generatorUUIDMock,
    hasherMock,
  );
  return { sut, inMemoryUserRepository, authServiceMock, hasherMock };
};

const makeRequest = (
  request: Partial<CreateUserWithEmailUseCaseRequest> = {},
): CreateUserWithEmailUseCaseRequest => {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.lorem.words(),
    ...request,
  };
};
describe("CreateUserWithEmailUseCaseImpl", () => {
  it("should return accessToken, refreshToken and user if not user exists", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeRequest());
    expect(response.value).toHaveProperty("accessToken");
    expect(response.value).toHaveProperty("refreshToken");
    expect(response.value).toHaveProperty("user");
  });
  it("should return exception if user already exists", async () => {
    const { sut, inMemoryUserRepository } = makeSut();
    const user = makeUser();
    await inMemoryUserRepository.create(user);
    const response = await sut.handle(makeRequest({ email: user.email }));
    expect(response.value).toBeInstanceOf(UserAlreadyExistsException);
  });

  it("should call LoadUserByEmailRepository with correct email", async () => {
    const { sut, inMemoryUserRepository } = makeSut();
    const email = faker.internet.email();
    const inMemoryUserRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      "findByEmail",
    );
    await sut.handle(makeRequest({ email }));
    expect(inMemoryUserRepositorySpy).toHaveBeenCalledWith(email);
  });
  it("should call AuthService with correct id", async () => {
    const { sut, inMemoryUserRepository, authServiceMock } = makeSut();
    const email = faker.internet.email();
    const generateAccessTokenSpy = jest.spyOn(
      authServiceMock,
      "generateAccessToken",
    );
    const generateRefreshTokenSpy = jest.spyOn(
      authServiceMock,
      "generateRefreshToken",
    );
    await sut.handle(makeRequest({ email }));
    const user = await inMemoryUserRepository.findByEmail(email);
    expect(generateRefreshTokenSpy).toHaveBeenCalledWith(user?.id);
    expect(generateAccessTokenSpy).toHaveBeenCalledWith(user?.id);
  });
  it("should save user with hash password", async () => {
    const { sut, inMemoryUserRepository, hasherMock } = makeSut();
    const email = faker.internet.email();

    await sut.handle(makeRequest({ email }));
    const user = await inMemoryUserRepository.findByEmail(email);
    expect(user?.password).toBe(hasherMock.response);
  });
  it("should call Hasher with correct password", async () => {
    const { sut, hasherMock } = makeSut();
    const email = faker.internet.email();
    const password = faker.lorem.words();
    const hasherSpy = jest.spyOn(hasherMock, "hash");
    await sut.handle(makeRequest({ email, password }));
    expect(hasherSpy).toHaveBeenCalledWith(password);
  });
});
