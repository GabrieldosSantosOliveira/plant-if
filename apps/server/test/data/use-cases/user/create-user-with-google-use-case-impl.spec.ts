import { CreateUserWithGoogleUseCaseImpl } from "../../../../src/data/use-cases/user/create-user-with-google-use-case-impl";
import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { makeUser } from "../../../domain/factories/make-user";
import { makeAuthFacadeMock } from "../../../infra/mocks/auth/auth-facade-mock";
import {
  makeLoadGoogleUserMock,
  makeLoadGoogleUserMockWithError,
} from "../../../infra/mocks/gateways/google/load-google-user-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { authFacadeMock } = makeAuthFacadeMock();
  const { loadGoogleUserMock } = makeLoadGoogleUserMock();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const sut = new CreateUserWithGoogleUseCaseImpl(
    loadGoogleUserMock,
    inMemoryUserRepository,
    authFacadeMock,
    inMemoryUserRepository,
  );
  return { sut, loadGoogleUserMock, inMemoryUserRepository, authFacadeMock };
};
const makeSutWithLoadGoogleError = () => {
  const { authFacadeMock } = makeAuthFacadeMock();
  const { loadGoogleUserMockWithError } = makeLoadGoogleUserMockWithError();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();

  const sut = new CreateUserWithGoogleUseCaseImpl(
    loadGoogleUserMockWithError,
    inMemoryUserRepository,
    authFacadeMock,
    inMemoryUserRepository,
  );
  return {
    sut,
    loadGoogleUserMockWithError,
    inMemoryUserRepository,
    authFacadeMock,
  };
};
describe("CreateUserWithGoogleUseCaseImpl", () => {
  it("should return accessToken, refreshToken and user if user not exists", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({ accessToken: "any_access_token" });
    expect(response).toHaveProperty("accessToken");
    expect(response).toHaveProperty("refreshToken");
    expect(response).toHaveProperty("user");
  });
  it("should return accessToken, refreshToken and user if user already exists", async () => {
    const { sut, inMemoryUserRepository, loadGoogleUserMock } = makeSut();
    const user = makeUser();
    await inMemoryUserRepository.create(user);
    loadGoogleUserMock.email = user.email;
    const response = await sut.handle({ accessToken: "any_access_token" });
    expect(response).toHaveProperty("accessToken");
    expect(response).toHaveProperty("refreshToken");
    expect(response).toHaveProperty("user");
  });
  it("should throw exception if accessToken is not valid", async () => {
    const { sut, loadGoogleUserMock } = makeSut();
    loadGoogleUserMock.success = false;
    const exception = sut.handle({ accessToken: "any_access_token" });
    await expect(exception).rejects.toThrow(new UnauthorizedException());
  });
  it("should throw if LoadGoogleUser throw", async () => {
    const { sut } = makeSutWithLoadGoogleError();
    const error = sut.handle({ accessToken: "any_access_token" });
    await expect(error).rejects.toThrow();
  });
  it("should call LoadGoogleUser with correct accessToken", async () => {
    const { sut, loadGoogleUserMock } = makeSut();
    const accessToken = mockValues.slug;
    const loadFacebookUserMockSpy = jest.spyOn(loadGoogleUserMock, "loadUser");
    await sut.handle({ accessToken });
    expect(loadFacebookUserMockSpy).toHaveBeenCalledWith({ accessToken });
  });
  it("should call LoadUserByEmailRepository with correct email", async () => {
    const { sut, inMemoryUserRepository, loadGoogleUserMock } = makeSut();
    const email = mockValues.email;
    loadGoogleUserMock.email = email;
    const inMemoryUserRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      "findByEmail",
    );
    await sut.handle({ accessToken: "any_access_token" });
    expect(inMemoryUserRepositorySpy).toHaveBeenCalledWith(email);
  });
  it("should call AuthService with correct id", async () => {
    const { sut, inMemoryUserRepository, authFacadeMock, loadGoogleUserMock } =
      makeSut();
    const email = mockValues.email;
    loadGoogleUserMock.email = email;
    const generateAccessTokenSpy = jest.spyOn(
      authFacadeMock,
      "signAccessToken",
    );
    const generateRefreshTokenSpy = jest.spyOn(
      authFacadeMock,
      "signRefreshToken",
    );
    await sut.handle({ accessToken: "any_access_token" });
    const user = await inMemoryUserRepository.findByEmail(email);

    expect(generateRefreshTokenSpy).toHaveBeenCalledWith(user?.id);
    expect(generateAccessTokenSpy).toHaveBeenCalledWith(user?.id);
  });
});
