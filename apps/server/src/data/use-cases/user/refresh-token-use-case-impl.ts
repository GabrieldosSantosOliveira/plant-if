import { LoadUserByIdRepository } from "../../../domain/contracts/repositories/user/load-user-by-id-repository";
import { UnauthorizedException } from "../../../domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "../../../domain/use-cases/errors/user-not-found-exception";
import { RefreshTokenUseCase } from "../../../domain/use-cases/user/refresh-token-use-case";
import { AuthFacade } from "../../protocols/auth/auth-facade";

export class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async handle({
    refreshToken,
  }: RefreshTokenUseCase.Params): Promise<RefreshTokenUseCase.Response> {
    const isValidRefreshToken =
      await this.authFacade.verifyRefreshToken(refreshToken);
    if (
      (isValidRefreshToken.error !== undefined &&
        isValidRefreshToken.error.length > 0) ||
      isValidRefreshToken.success === undefined
    ) {
      throw new UnauthorizedException();
    }

    const userExists = await this.loadUserByIdRepository.findById(
      isValidRefreshToken.success.sub,
    );
    if (!userExists) {
      throw new UserNotFoundException();
    }
    const { accessToken } = await this.authFacade.signAccessToken(
      userExists.id,
    );
    return {
      accessToken,
    };
  }
}
