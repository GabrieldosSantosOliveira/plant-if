import { AuthServiceImpl } from "@/infra/auth/auth-service-impl";
import { left, right } from "@/shared/either";

import { makeJwtMock, makeJwtMockError } from "../mocks/auth/jwt-mock";

const options = {
  EXPIRE_ACCESS_TOKEN: 100,
  EXPIRE_REFRESH_TOKEN: 200,
  SECRET_ACCESS_TOKEN: "SECRET_ACCESS_TOKEN",
  SECRET_REFRESH_TOKEN: "SECRET_REFRESH_TOKEN",
};
const makeSut = () => {
  const { jwtMock } = makeJwtMock();
  const sut = new AuthServiceImpl(jwtMock, options);
  return { sut, jwtMock };
};
const makeSutWithError = () => {
  const { jwtMockError } = makeJwtMockError();
  const sut = new AuthServiceImpl(jwtMockError, {
    EXPIRE_ACCESS_TOKEN: 100,
    EXPIRE_REFRESH_TOKEN: 200,
    SECRET_ACCESS_TOKEN: "SECRET_ACCESS_TOKEN",
    SECRET_REFRESH_TOKEN: "SECRET_REFRESH_TOKEN",
  });
  return { sut, jwtMockError };
};
describe("AuthServiceImpl", () => {
  it("should throw if SECRET_ACCESS_TOKEN is equal to SECRET_REFRESH_TOKEN", () => {
    const { jwtMock } = makeJwtMock();
    const options = {
      EXPIRE_ACCESS_TOKEN: 100,
      EXPIRE_REFRESH_TOKEN: 200,
      SECRET_ACCESS_TOKEN: "ANY",
      SECRET_REFRESH_TOKEN: "ANY",
    };
    expect(() => new AuthServiceImpl(jwtMock, options)).toThrow();
  });
  describe("generateAccessToken", () => {
    it("should return accessToken if success", async () => {
      const { sut } = makeSut();
      const response = await sut.generateAccessToken("any_id");
      expect(response).toEqual({ accessToken: "any_token" });
    });
    it("should throw if jwt encrypt throw", async () => {
      const { sut } = makeSutWithError();
      await expect(sut.generateAccessToken("any_id")).rejects.toThrow();
    });
    it("should call jwt encrypt with correct params", async () => {
      const { sut, jwtMock } = makeSut();
      const encryptSpy = jest.spyOn(jwtMock, "encrypt");
      await sut.generateAccessToken("any_id");
      expect(encryptSpy).toHaveBeenCalledWith(
        { sub: "any_id" },
        {
          secret: options.SECRET_ACCESS_TOKEN,
          expire: options.EXPIRE_ACCESS_TOKEN,
        },
      );
    });
  });
  describe("generateRefreshToken", () => {
    it("should return refreshToken if success", async () => {
      const { sut } = makeSut();
      const response = await sut.generateRefreshToken("any_id");
      expect(response).toEqual({ refreshToken: "any_token" });
    });
    it("should throw if jwt encrypt throw", async () => {
      const { sut } = makeSutWithError();
      await expect(sut.generateRefreshToken("any_id")).rejects.toThrow();
    });
    it("should call jwt encrypt with correct params", async () => {
      const { sut, jwtMock } = makeSut();
      const encryptSpy = jest.spyOn(jwtMock, "encrypt");
      await sut.generateRefreshToken("any_id");
      expect(encryptSpy).toHaveBeenCalledWith(
        { sub: "any_id" },
        {
          secret: options.SECRET_REFRESH_TOKEN,
          expire: options.EXPIRE_REFRESH_TOKEN,
        },
      );
    });
  });
  describe("decryptAccessToken", () => {
    it("should decrypt accessToken if success", async () => {
      const { sut } = makeSut();
      const response = await sut.decryptAccessToken("any_id");
      expect(response).toEqual(right({ sub: "any_sub" }));
    });
    it("should return left error if invalid accessToken is provided", async () => {
      const { sut } = makeSutWithError();
      const error = await sut.decryptAccessToken("any_token");
      expect(error).toEqual(left(new Error()));
    });
    it("should call jwt decrypt with correct params", async () => {
      const { sut, jwtMock } = makeSut();
      const decryptSpy = jest.spyOn(jwtMock, "decrypt");
      await sut.decryptAccessToken("any_token");
      expect(decryptSpy).toHaveBeenCalledWith("any_token", {
        secret: options.SECRET_ACCESS_TOKEN,
      });
    });
  });
  describe("decryptRefreshToken", () => {
    it("should decrypt refreshToken if success", async () => {
      const { sut } = makeSut();
      const response = await sut.decryptRefreshToken("any_id");
      expect(response).toEqual(right({ sub: "any_sub" }));
    });
    it("should return left error if invalid refreshToken is provided", async () => {
      const { sut } = makeSutWithError();
      const error = await sut.decryptRefreshToken("any_token");
      expect(error).toEqual(left(new Error()));
    });
    it("should call jwt decrypt with correct params", async () => {
      const { sut, jwtMock } = makeSut();
      const decryptSpy = jest.spyOn(jwtMock, "decrypt");
      await sut.decryptRefreshToken("any_token");
      expect(decryptSpy).toHaveBeenCalledWith("any_token", {
        secret: options.SECRET_REFRESH_TOKEN,
      });
    });
  });
});
