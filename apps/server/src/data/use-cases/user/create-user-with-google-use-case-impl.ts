import { LoadGoogleUser } from "../../../domain/contracts/gateways/google/load-google-user";
import { CreateUserRepository } from "../../../domain/contracts/repositories/user/create-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/contracts/repositories/user/load-user-by-email-repository";
import { UnauthorizedException } from "../../../domain/use-cases/errors/unauthorized-exception";
import { CreateUserWithGoogleUseCase } from "../../../domain/use-cases/user/create-user-with-google-use-case";
import { AuthFacade } from "../../protocols/auth/auth-facade";

export class CreateUserWithGoogleUseCaseImpl
  implements CreateUserWithGoogleUseCase
{
  constructor(
    private readonly loadGoogleUser: LoadGoogleUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authFacade: AuthFacade,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async handle(
    request: CreateUserWithGoogleUseCase.Params,
  ): Promise<CreateUserWithGoogleUseCase.Response> {
    const googleUser = await this.loadGoogleUser.loadUser({
      accessToken: request.accessToken,
    });
    if (!googleUser.success || !googleUser.user) {
      throw new UnauthorizedException();
    }
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      googleUser.user.email,
    );
    if (userExists) {
      const { refreshToken } = await this.authFacade.signRefreshToken(
        userExists.id,
      );
      const { accessToken } = await this.authFacade.signAccessToken(
        userExists.id,
      );
      return { accessToken, refreshToken, user: userExists };
    }
    const user = await this.createUserRepository.create({
      email: googleUser.user.email,
      firstName: googleUser.user.given_name,
      lastName: googleUser.user.family_name,
    });
    const { refreshToken } = await this.authFacade.signRefreshToken(user.id);
    const { accessToken } = await this.authFacade.signAccessToken(user.id);
    return { accessToken, refreshToken, user };
  }
}
