import jsonWebToken from "jsonwebtoken";
import { JsonWebToken } from "../../data/protocols/auth/json-web-token";
export class JsonWebTokenImpl implements JsonWebToken {
  async sign<T extends JsonWebToken.SignPayload>(
    payload: T,
    options: JsonWebToken.SignOptions,
  ): Promise<JsonWebToken.SignResponse> {
    const token = jsonWebToken.sign(payload, options.secret, {
      expiresIn: options.expire,
    });
    return token;
  }
  async verify<T>(
    token: string,
    options: JsonWebToken.VerifyOptions,
  ): Promise<JsonWebToken.VerifyResponse<T>> {
    try {
      const payload = jsonWebToken.verify(token, options.secret) as T;
      return { success: payload };
    } catch (error) {
      if (error instanceof Error) {
        return { error: [error] };
      }
      return { error: [new Error("jsonWebToken error")] };
    }
  }
}
