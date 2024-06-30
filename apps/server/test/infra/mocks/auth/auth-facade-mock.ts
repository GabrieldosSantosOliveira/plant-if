import { AuthFacade } from "../../../../src/data/protocols/auth/auth-facade";

export class AuthFacadeMock implements AuthFacade {
  public responseGenerateAccessToken = "any_access_token";
  public responseGenerateRefreshToken = "any_refresh_token";
  public responseDecryptAccessToken = 1;
  public responseDecryptRefreshToken = 1;
  async signAccessToken(): Promise<AuthFacade.SignAccessTokenResponse> {
    return { accessToken: this.responseGenerateAccessToken };
  }
  async signRefreshToken(): Promise<AuthFacade.SignRefreshTokenResponse> {
    return { refreshToken: this.responseGenerateRefreshToken };
  }
  async verifyAccessToken(): Promise<AuthFacade.VerifyAccessTokenResponse> {
    return { success: { sub: this.responseDecryptAccessToken } };
  }
  async verifyRefreshToken(): Promise<AuthFacade.VerifyRefreshTokenResponse> {
    return { success: { sub: this.responseDecryptRefreshToken } };
  }
}
export const makeAuthFacadeMock = () => {
  const authFacadeMock = new AuthFacadeMock();
  return { authFacadeMock };
};
export class AuthFacadeMockWithError implements AuthFacade {
  public responseGenerateAccessToken = "any_access_token";
  public responseGenerateRefreshToken = "any_refresh_token";
  async signAccessToken(): Promise<AuthFacade.SignAccessTokenResponse> {
    throw new Error();
  }
  async signRefreshToken(): Promise<AuthFacade.SignRefreshTokenResponse> {
    throw new Error();
  }
  async verifyAccessToken(): Promise<AuthFacade.VerifyAccessTokenResponse> {
    return { error: [new Error()] };
  }
  async verifyRefreshToken(): Promise<AuthFacade.VerifyRefreshTokenResponse> {
    return { error: [new Error()] };
  }
}
export const makeAuthFacadeMockWithError = () => {
  const authFacadeMockWithError = new AuthFacadeMockWithError();
  return { authFacadeMockWithError };
};
