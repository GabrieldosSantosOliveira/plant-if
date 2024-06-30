import { CreateUserWithFacebookUseCaseImpl } from "../../../../src/data/use-cases/user/create-user-with-facebook-use-case-impl";
import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { makeUser } from "../../../domain/factories/make-user";
import { makeAuthFacadeMock } from "../../../infra/mocks/auth/auth-facade-mock";
import {
  makeLoadFacebookUserMock,
  makeLoadFacebookUserMockWithException,
} from "../../../infra/mocks/gateways/facebook/load-facebook-user-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { authFacadeMock } = makeAuthFacadeMock();
  const { loadFacebookUserMock } = makeLoadFacebookUserMock();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const sut = new CreateUserWithFacebookUseCaseImpl(
    loadFacebookUserMock,
    inMemoryUserRepository,
    authFacadeMock,
    inMemoryUserRepository,
  );
  return { sut, loadFacebookUserMock, inMemoryUserRepository, authFacadeMock };
};
const makeSutWithLoadFacebookException = () => {
  const { authFacadeMock } = makeAuthFacadeMock();
  const { loadFacebookUserMockWithException } =
    makeLoadFacebookUserMockWithException();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();

  const sut = new CreateUserWithFacebookUseCaseImpl(
    loadFacebookUserMockWithException,
    inMemoryUserRepository,
    authFacadeMock,
    inMemoryUserRepository,
  );
  return {
    sut,
    loadFacebookUserMockWithException,
    inMemoryUserRepository,
    authFacadeMock,
  };
};
describe("CreateUserWithFacebookUseCaseImpl", () => {
  it("should return accessToken, refreshToken and user if user not exists", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({ accessToken: "any_access_token" });
    expect(response).toHaveProperty("accessToken");
    expect(response).toHaveProperty("refreshToken");
    expect(response).toHaveProperty("user");
  });
  it("should return accessToken, refreshToken and user if user already exists", async () => {
    const { sut, inMemoryUserRepository, loadFacebookUserMock } = makeSut();
    const user = makeUser();
    await inMemoryUserRepository.create(user);
    loadFacebookUserMock.email = user.email;
    const response = await sut.handle({ accessToken: "any_access_token" });
    expect(response).toHaveProperty("accessToken");
    expect(response).toHaveProperty("refreshToken");
    expect(response).toHaveProperty("user");
  });
  it("should throw if accessToken is not valid", async () => {
    const { sut, loadFacebookUserMock } = makeSut();
    loadFacebookUserMock.success = false;
    await expect(
      sut.handle({ accessToken: "any_access_token" }),
    ).rejects.toThrow(new UnauthorizedException());
  });
  it("should throw if LoadFacebookUser throw", async () => {
    const { sut } = makeSutWithLoadFacebookException();
    await expect(
      sut.handle({ accessToken: "any_access_token" }),
    ).rejects.toThrow();
  });
  it("should call LoadFacebookUser with correct accessToken", async () => {
    const { sut, loadFacebookUserMock } = makeSut();
    const accessToken = mockValues.slug;
    const loadFacebookUserMockSpy = jest.spyOn(
      loadFacebookUserMock,
      "loadUser",
    );
    await sut.handle({ accessToken });
    expect(loadFacebookUserMockSpy).toHaveBeenCalledWith({ accessToken });
  });
  it("should call LoadUserByEmailRepository with correct email", async () => {
    const { sut, inMemoryUserRepository, loadFacebookUserMock } = makeSut();
    const email = mockValues.email;
    loadFacebookUserMock.email = email;
    const inMemoryUserRepositorySpy = jest.spyOn(
      inMemoryUserRepository,
      "findByEmail",
    );
    await sut.handle({ accessToken: "any_access_token" });
    expect(inMemoryUserRepositorySpy).toHaveBeenCalledWith(email);
  });
  it("should call AuthService with correct id", async () => {
    const {
      sut,
      inMemoryUserRepository,
      authFacadeMock,
      loadFacebookUserMock,
    } = makeSut();
    const email = mockValues.email;
    loadFacebookUserMock.email = email;
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
