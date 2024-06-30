import { AuthenticateUserWithEmailUseCaseImpl } from "../../../../src/data/use-cases/user/authenticate-user-with-email-use-case-impl";
import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { AuthenticateUserWithEmailUseCase } from "../../../../src/domain/use-cases/user/authenticate-user-with-email-use-case";
import { makeUser } from "../../../domain/factories/make-user";
import { makeAuthFacadeMock } from "../../../infra/mocks/auth/auth-facade-mock";
import { makeBcryptMock } from "../../../infra/mocks/cryptography/make-bcrypt-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { bcryptMock } = makeBcryptMock();
  const { authFacadeMock } = makeAuthFacadeMock();
  const sut = new AuthenticateUserWithEmailUseCaseImpl(
    inMemoryUserRepository,
    bcryptMock,
    authFacadeMock,
  );
  return { sut, authFacadeMock, inMemoryUserRepository, bcryptMock };
};
const makeSutWithUser = async () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { bcryptMock } = makeBcryptMock();
  const { authFacadeMock } = makeAuthFacadeMock();
  const sut = new AuthenticateUserWithEmailUseCaseImpl(
    inMemoryUserRepository,
    bcryptMock,
    authFacadeMock,
  );
  const user = makeUser();
  await inMemoryUserRepository.create(user);
  return {
    sut,
    authFacadeMock,
    inMemoryUserRepository,
    bcryptMock,
    user,
  };
};
const makeCredentials = (
  credentials: Partial<AuthenticateUserWithEmailUseCase.Params> = {},
): AuthenticateUserWithEmailUseCase.Params => {
  return {
    email: mockValues.email,
    password: mockValues.password,
    ...credentials,
  };
};
describe("AuthenticateUserWithEmailUseCaseImpl", () => {
  it("should throw exception if user not found", async () => {
    const { sut } = makeSut();
    await expect(sut.handle(makeCredentials())).rejects.toThrow(
      new UserNotFoundException(),
    );
  });
  it("should return user, accessToken and refreshToken if success", async () => {
    const { sut, user, inMemoryUserRepository } = await makeSutWithUser();
    const response = await sut.handle(
      makeCredentials({ email: user.email, password: user.password }),
    );
    const userInDatabase = await inMemoryUserRepository.findByEmail(user.email);
    expect(response).toEqual({
      user: userInDatabase,
      accessToken: "any_access_token",
      refreshToken: "any_refresh_token",
    });
  });
  it("should throw exception if password not match", async () => {
    const { sut, user, bcryptMock } = await makeSutWithUser();
    bcryptMock.isValid = false;
    const exception = sut.handle(makeCredentials({ email: user.email }));
    await expect(exception).rejects.toThrow(new UnauthorizedException());
  });
  it("should throw exception if user no has password", async () => {
    const { sut, inMemoryUserRepository } = makeSut();
    const user = makeUser();
    user.password = undefined;
    await inMemoryUserRepository.create(user);
    const exception = sut.handle(makeCredentials({ email: user.email }));
    await expect(exception).rejects.toThrow(new UnauthorizedException());
  });
  it("should call LoadUserByEmailRepository with correct email", async () => {
    const { sut, inMemoryUserRepository } = await makeSutWithUser();
    const credentials = makeCredentials();

    const loadUserByEmailRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      "findByEmail",
    );
    await sut.handle(makeCredentials(credentials));
    expect(loadUserByEmailRepositorySpy).toHaveBeenCalledWith(
      credentials.email,
    );
  });
  it("should call Bcrypt with correct password and hash", async () => {
    const { sut, bcryptMock, user } = await makeSutWithUser();
    const hashComparerSpy = jest.spyOn(bcryptMock, "compare");
    const credentials = makeCredentials({
      email: user.email,
      password: user.password,
    });
    await sut.handle(credentials);
    expect(hashComparerSpy).toHaveBeenCalledWith(
      credentials.password,
      user.password,
    );
  });
  it("should call AuthService with correct id", async () => {
    const { sut, authFacadeMock, user, inMemoryUserRepository } =
      await makeSutWithUser();
    const generateAccessTokenSpy = jest.spyOn(
      authFacadeMock,
      "signAccessToken",
    );
    const generateRefreshTokenSpy = jest.spyOn(
      authFacadeMock,
      "signRefreshToken",
    );
    const credentials = makeCredentials({
      email: user.email,
      password: user.password,
    });
    await sut.handle(credentials);
    const userInDatabase = await inMemoryUserRepository.findByEmail(user.email);
    expect(generateAccessTokenSpy).toHaveBeenCalledWith(userInDatabase?.id);
    expect(generateRefreshTokenSpy).toHaveBeenCalledWith(userInDatabase?.id);
  });
});
