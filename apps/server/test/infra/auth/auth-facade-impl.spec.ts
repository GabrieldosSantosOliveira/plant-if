import { AuthFacadeImpl } from "../../../src/infra/auth/auth-facade-impl";
import {
  makeJsonWebTokenMock,
  makeJsonWebTokenMockError,
} from "../mocks/auth/json-web-token-mock";

const options = {
  EXPIRE_ACCESS_TOKEN: 100,
  EXPIRE_REFRESH_TOKEN: 200,
  SECRET_ACCESS_TOKEN: "SECRET_ACCESS_TOKEN",
  SECRET_REFRESH_TOKEN: "SECRET_REFRESH_TOKEN",
};
const makeSut = () => {
  const { jsonWebTokenMock } = makeJsonWebTokenMock();
  const sut = new AuthFacadeImpl(jsonWebTokenMock, options);
  return { sut, jsonWebTokenMock };
};
const makeSutWithError = () => {
  const { jsonWebTokenMockError } = makeJsonWebTokenMockError();
  const sut = new AuthFacadeImpl(jsonWebTokenMockError, {
    EXPIRE_ACCESS_TOKEN: 100,
    EXPIRE_REFRESH_TOKEN: 200,
    SECRET_ACCESS_TOKEN: "SECRET_ACCESS_TOKEN",
    SECRET_REFRESH_TOKEN: "SECRET_REFRESH_TOKEN",
  });
  return { sut, jsonWebTokenMockError };
};
const any_id = 1;
describe("AuthServiceImpl", () => {
  it("should throw if SECRET_ACCESS_TOKEN is equal to SECRET_REFRESH_TOKEN", () => {
    const { jsonWebTokenMock } = makeJsonWebTokenMock();
    const options = {
      EXPIRE_ACCESS_TOKEN: 100,
      EXPIRE_REFRESH_TOKEN: 200,
      SECRET_ACCESS_TOKEN: "ANY",
      SECRET_REFRESH_TOKEN: "ANY",
    };
    expect(() => new AuthFacadeImpl(jsonWebTokenMock, options)).toThrow();
  });
  describe("signAccessToken", () => {
    it("should return accessToken if success", async () => {
      const { sut } = makeSut();
      const response = await sut.signAccessToken(any_id);
      expect(response).toEqual({ accessToken: "any_token" });
    });
    it("should throw if jwt sign throw", async () => {
      const { sut } = makeSutWithError();
      await expect(sut.signAccessToken(any_id)).rejects.toThrow();
    });
    it("should call jwt sign with correct params", async () => {
      const { sut, jsonWebTokenMock } = makeSut();
      const encryptSpy = jest.spyOn(jsonWebTokenMock, "sign");
      await sut.signAccessToken(any_id);
      expect(encryptSpy).toHaveBeenCalledWith(
        { sub: any_id },
        {
          secret: options.SECRET_ACCESS_TOKEN,
          expire: options.EXPIRE_ACCESS_TOKEN,
        },
      );
    });
  });
  describe("signRefreshToken", () => {
    it("should return refreshToken if success", async () => {
      const { sut } = makeSut();
      const response = await sut.signRefreshToken(any_id);
      expect(response).toEqual({ refreshToken: "any_token" });
    });
    it("should throw if jwt sign throw", async () => {
      const { sut } = makeSutWithError();
      await expect(sut.signRefreshToken(any_id)).rejects.toThrow();
    });
    it("should call jwt encrypt with correct params", async () => {
      const { sut, jsonWebTokenMock } = makeSut();
      const encryptSpy = jest.spyOn(jsonWebTokenMock, "sign");
      await sut.signRefreshToken(any_id);
      expect(encryptSpy).toHaveBeenCalledWith(
        { sub: any_id },
        {
          secret: options.SECRET_REFRESH_TOKEN,
          expire: options.EXPIRE_REFRESH_TOKEN,
        },
      );
    });
  });
  describe("verifyAccessToken", () => {
    it("should verify accessToken if success", async () => {
      const { sut, jsonWebTokenMock } = makeSut();
      const response = await sut.verifyAccessToken("any_access_token");
      expect(response).toEqual({
        success: { sub: jsonWebTokenMock.verifyResponse.sub },
      });
    });
    it("should return error if invalid accessToken is provided", async () => {
      const { sut } = makeSutWithError();
      const error = await sut.verifyAccessToken("any_token");
      expect(error).toEqual({ error: [new Error()] });
    });
    it("should call jwt decrypt with correct params", async () => {
      const { sut, jsonWebTokenMock } = makeSut();
      const verifySpy = jest.spyOn(jsonWebTokenMock, "verify");
      await sut.verifyAccessToken("any_token");
      expect(verifySpy).toHaveBeenCalledWith("any_token", {
        secret: options.SECRET_ACCESS_TOKEN,
      });
    });
  });
  describe("verifyRefreshToken", () => {
    it("should verify refreshToken if success", async () => {
      const { sut, jsonWebTokenMock } = makeSut();
      const response = await sut.verifyRefreshToken("any_id");
      expect(response).toEqual({
        success: { sub: jsonWebTokenMock.verifyResponse.sub },
      });
    });
    it("should return error if invalid refreshToken is provided", async () => {
      const { sut } = makeSutWithError();
      const error = await sut.verifyRefreshToken("any_token");
      expect(error).toEqual({ error: [new Error()] });
    });
    it("should call jwt verify with correct params", async () => {
      const { sut, jsonWebTokenMock } = makeSut();
      const verifySpy = jest.spyOn(jsonWebTokenMock, "verify");
      await sut.verifyRefreshToken("any_token");
      expect(verifySpy).toHaveBeenCalledWith("any_token", {
        secret: options.SECRET_REFRESH_TOKEN,
      });
    });
  });
});
