import { CreateUserWithEmailUseCaseImpl } from "../../../../src/data/use-cases/user/create-user-with-email-use-case-impl";
import { UserAlreadyExistsException } from "../../../../src/domain/use-cases/errors/user-already-exists-exception";
import { CreateUserWithEmailUseCase } from "../../../../src/domain/use-cases/user/create-user-with-email-use-case";
import { makeUser } from "../../../domain/factories/make-user";
import { makeAuthFacadeMock } from "../../../infra/mocks/auth/auth-facade-mock";
import { makeBcryptMock } from "../../../infra/mocks/cryptography/make-bcrypt-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { authFacadeMock } = makeAuthFacadeMock();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { bcryptMock } = makeBcryptMock();
  const sut = new CreateUserWithEmailUseCaseImpl(
    inMemoryUserRepository,
    authFacadeMock,
    inMemoryUserRepository,
    bcryptMock,
  );
  return { sut, inMemoryUserRepository, authFacadeMock, bcryptMock };
};

const makeRequest = (
  request: Partial<CreateUserWithEmailUseCase.Params> = {},
): CreateUserWithEmailUseCase.Params => {
  return {
    email: mockValues.email,
    firstName: mockValues.firstName,
    lastName: mockValues.lastName,
    password: mockValues.password,
    ...request,
  };
};
describe("CreateUserWithEmailUseCaseImpl", () => {
  it("should return accessToken, refreshToken and user if not user exists", async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeRequest());
    expect(response).toHaveProperty("accessToken");
    expect(response).toHaveProperty("refreshToken");
    expect(response).toHaveProperty("user");
  });
  it("should throw exception if user already exists", async () => {
    const { sut, inMemoryUserRepository } = makeSut();
    const user = makeUser();
    await inMemoryUserRepository.create(user);
    const exception = sut.handle(makeRequest({ email: user.email }));
    await expect(exception).rejects.toThrow(UserAlreadyExistsException);
  });

  it("should call LoadUserByEmailRepository with correct email", async () => {
    const { sut, inMemoryUserRepository } = makeSut();
    const email = mockValues.email;
    const inMemoryUserRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      "findByEmail",
    );
    await sut.handle(makeRequest({ email }));
    expect(inMemoryUserRepositorySpy).toHaveBeenCalledWith(email);
  });
  it("should call AuthService with correct id", async () => {
    const { sut, inMemoryUserRepository, authFacadeMock } = makeSut();
    const email = mockValues.email;
    const generateAccessTokenSpy = jest.spyOn(
      authFacadeMock,
      "signAccessToken",
    );
    const generateRefreshTokenSpy = jest.spyOn(
      authFacadeMock,
      "signRefreshToken",
    );
    await sut.handle(makeRequest({ email }));
    const user = await inMemoryUserRepository.findByEmail(email);
    expect(generateRefreshTokenSpy).toHaveBeenCalledWith(user?.id);
    expect(generateAccessTokenSpy).toHaveBeenCalledWith(user?.id);
  });
  it("should save user with hash password", async () => {
    const { sut, inMemoryUserRepository, bcryptMock } = makeSut();
    const email = mockValues.email;

    await sut.handle(makeRequest({ email }));
    const user = await inMemoryUserRepository.findByEmail(email);
    expect(user?.password).toBe(bcryptMock.response);
  });
  it("should call Bcrypt with correct password", async () => {
    const { sut, bcryptMock } = makeSut();
    const email = mockValues.email;
    const password = mockValues.password;
    const bcryptSpy = jest.spyOn(bcryptMock, "hash");
    await sut.handle(makeRequest({ email, password }));
    expect(bcryptSpy).toHaveBeenCalledWith(password);
  });
});
