import { JsonWebToken } from "../../../../src/data/protocols/auth/json-web-token";

export class JsonWebTokenMock implements JsonWebToken {
  public signResponse = "any_token";
  public verifyResponse = { sub: 1 };

  async sign(): Promise<string> {
    return this.signResponse;
  }
  async verify<
    T extends JsonWebToken.SignPayload = JsonWebToken.SignPayload,
  >(): Promise<JsonWebToken.VerifyResponse<T>> {
    return { success: this.verifyResponse as T };
  }
}
export const makeJsonWebTokenMock = () => {
  const jsonWebTokenMock = new JsonWebTokenMock();
  return { jsonWebTokenMock };
};
export class JsonWebTokenMockError implements JsonWebToken {
  async sign(): Promise<string> {
    throw new Error();
  }
  async verify<
    T extends JsonWebToken.SignPayload = JsonWebToken.SignPayload,
  >(): Promise<JsonWebToken.VerifyResponse<T>> {
    return {
      error: [new Error()],
    };
  }
}
export const makeJsonWebTokenMockError = () => {
  const jsonWebTokenMockError = new JsonWebTokenMockError();
  return { jsonWebTokenMockError };
};
