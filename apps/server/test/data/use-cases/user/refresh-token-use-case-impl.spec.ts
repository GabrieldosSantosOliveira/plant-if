import { RefreshTokenUseCaseImpl } from "../../../../src/data/use-cases/user/refresh-token-use-case-impl";
import { UnauthorizedException } from "../../../../src/domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { RefreshTokenUseCase } from "../../../../src/domain/use-cases/user/refresh-token-use-case";
import { makeUser } from "../../../domain/factories/make-user";
import {
  makeAuthFacadeMock,
  makeAuthFacadeMockWithError,
} from "../../../infra/mocks/auth/auth-facade-mock";
import { makeInMemoryUserRepository } from "../../../infra/mocks/repositories/user/in-memory-user-repository";
import { mockValues } from "../../../mock/mock-values";

const makeSut = () => {
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const { authFacadeMock } = makeAuthFacadeMock();
  const sut = new RefreshTokenUseCaseImpl(
    authFacadeMock,
    inMemoryUserRepository,
  );
  return { sut, inMemoryUserRepository, authFacadeMock };
};
const makeRequest = (): RefreshTokenUseCase.Params => {
  return {
    refreshToken: mockValues.slug,
  };
};
const makeSutWithError = () => {
  const { authFacadeMockWithError } = makeAuthFacadeMockWithError();
  const { inMemoryUserRepository } = makeInMemoryUserRepository();
  const sut = new RefreshTokenUseCaseImpl(
    authFacadeMockWithError,
    inMemoryUserRepository,
  );
  return { sut, inMemoryUserRepository, authFacadeMockWithError };
};
describe("RefreshTokenUseCaseImpl", () => {
  it("should return accessToken if success", async () => {
    const { sut, inMemoryUserRepository, authFacadeMock } = makeSut();
    const user = await inMemoryUserRepository.create(makeUser());
    authFacadeMock.responseDecryptRefreshToken = user.id;
    const response = await sut.handle(makeRequest());
    expect(response).toEqual({
      accessToken: "any_access_token",
    });
  });
  it("should throw exception user not found if user not found", async () => {
    const { sut } = makeSut();
    const exception = sut.handle(makeRequest());
    await expect(exception).rejects.toThrow(new UserNotFoundException());
  });
  it("should throw unauthorized exception if refreshToken is not valid", async () => {
    const { sut } = makeSutWithError();
    const exception = sut.handle(makeRequest());
    await expect(exception).rejects.toThrow(new UnauthorizedException());
  });
});
