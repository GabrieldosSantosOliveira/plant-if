import { LoadUserByEmailRepository } from "../../../domain/contracts/repositories/user/load-user-by-email-repository";
import { UnauthorizedException } from "../../../domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "../../../domain/use-cases/errors/user-not-found-exception";
import { AuthenticateUserWithEmailUseCase } from "../../../domain/use-cases/user/authenticate-user-with-email-use-case";
import { AuthFacade } from "../../protocols/auth/auth-facade";
import { Bcrypt } from "../../protocols/cryptography/bcrypt";

export class AuthenticateUserWithEmailUseCaseImpl
  implements AuthenticateUserWithEmailUseCase
{
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly bcrypt: Bcrypt,
    private readonly authFacade: AuthFacade,
  ) {}

  async handle(
    credentials: AuthenticateUserWithEmailUseCase.Params,
  ): Promise<AuthenticateUserWithEmailUseCase.Response> {
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      credentials.email,
    );
    if (!userExists) {
      throw new UserNotFoundException();
    }
    if (!userExists.password) {
      throw new UnauthorizedException();
    }
    const passwordMatch = await this.bcrypt.compare(
      credentials.password,
      userExists.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    const { accessToken } = await this.authFacade.signAccessToken(
      userExists.id,
    );
    const { refreshToken } = await this.authFacade.signRefreshToken(
      userExists.id,
    );
    return {
      accessToken,
      refreshToken,
      user: userExists,
    };
  }
}
