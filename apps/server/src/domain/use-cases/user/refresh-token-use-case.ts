export interface RefreshTokenUseCase {
  handle(
    params: RefreshTokenUseCase.Params,
  ): Promise<RefreshTokenUseCase.Response>;
}
export declare module RefreshTokenUseCase {
  export interface Params {
    refreshToken: string;
  }
  export interface Response {
    accessToken: string;
  }
}
