export interface AuthFacade {
  signAccessToken(sub: number): Promise<AuthFacade.SignAccessTokenResponse>;
  signRefreshToken(sub: number): Promise<AuthFacade.SignRefreshTokenResponse>;
  verifyAccessToken(
    accessToken: string,
  ): Promise<AuthFacade.VerifyAccessTokenResponse>;
  verifyRefreshToken(
    refreshToken: string,
  ): Promise<AuthFacade.VerifyRefreshTokenResponse>;
}
export declare module AuthFacade {
  export interface SignAccessTokenResponse {
    accessToken: string;
  }
  export interface SignRefreshTokenResponse {
    refreshToken: string;
  }
  export interface Payload {
    sub: number;
    [key: string]: unknown;
  }
  export interface VerifyAccessTokenResponse {
    success?: Payload;
    error?: Error[];
  }
  export interface VerifyRefreshTokenResponse {
    success?: Payload;
    error?: Error[];
  }
}
