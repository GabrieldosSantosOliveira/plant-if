import { AuthFacade } from "../../data/protocols/auth/auth-facade";
import { JsonWebToken } from "../../data/protocols/auth/json-web-token";
import { InvalidParamError } from "../../utils/errors/invalid-param-error";

export interface AuthFacadeOptions {
  SECRET_ACCESS_TOKEN: string;
  SECRET_REFRESH_TOKEN: string;
  EXPIRE_ACCESS_TOKEN: number;
  EXPIRE_REFRESH_TOKEN: number;
}
export class AuthFacadeImpl implements AuthFacade {
  private readonly options: AuthFacadeOptions;
  constructor(
    private readonly jsonWebToken: JsonWebToken,
    options: AuthFacadeOptions,
  ) {
    if (options.SECRET_ACCESS_TOKEN === options.SECRET_REFRESH_TOKEN) {
      throw new InvalidParamError(
        "SECRET_ACCESS_TOKEN should not be equal SECRET_REFRESH_TOKEN",
      );
    }
    this.options = options;
  }
  async signAccessToken(
    sub: number,
  ): Promise<AuthFacade.SignAccessTokenResponse> {
    const accessToken = await this.jsonWebToken.sign(
      { sub: sub },
      {
        secret: this.options.SECRET_ACCESS_TOKEN,
        expire: this.options.EXPIRE_ACCESS_TOKEN,
      },
    );
    return { accessToken };
  }
  async signRefreshToken(
    sub: number,
  ): Promise<AuthFacade.SignRefreshTokenResponse> {
    const refreshToken = await this.jsonWebToken.sign(
      { sub: sub },
      {
        secret: this.options.SECRET_REFRESH_TOKEN,
        expire: this.options.EXPIRE_REFRESH_TOKEN,
      },
    );
    return { refreshToken };
  }
  verifyAccessToken(
    accessToken: string,
  ): Promise<AuthFacade.VerifyAccessTokenResponse> {
    return this.jsonWebToken.verify(accessToken, {
      secret: this.options.SECRET_ACCESS_TOKEN,
    });
  }
  verifyRefreshToken(
    refreshToken: string,
  ): Promise<AuthFacade.VerifyRefreshTokenResponse> {
    return this.jsonWebToken.verify(refreshToken, {
      secret: this.options.SECRET_REFRESH_TOKEN,
    });
  }
}
