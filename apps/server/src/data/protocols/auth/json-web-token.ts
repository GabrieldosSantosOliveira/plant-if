export interface JsonWebToken {
  sign<T extends JsonWebToken.SignPayload = JsonWebToken.SignPayload>(
    payload: T,
    options: JsonWebToken.SignOptions,
  ): Promise<JsonWebToken.SignResponse>;
  verify<T extends JsonWebToken.SignPayload = JsonWebToken.SignPayload>(
    token: string,
    options: JsonWebToken.VerifyOptions,
  ): Promise<JsonWebToken.VerifyResponse<T>>;
}
export declare module JsonWebToken {
  export interface VerifyResponse<T> {
    error?: Error[];
    success?: T;
  }
  export interface VerifyOptions {
    secret: string;
  }
  export type SignResponse = string;
  export interface SignOptions {
    secret: string;
    expire: number;
  }
  export interface SignPayload {
    sub: unknown;
    [key: string]: unknown;
  }
}
