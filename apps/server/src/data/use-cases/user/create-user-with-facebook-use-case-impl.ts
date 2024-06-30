import { LoadFacebookUser } from "../../../domain/contracts/gateways/facebook/load-facebook-user";
import { CreateUserRepository } from "../../../domain/contracts/repositories/user/create-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/contracts/repositories/user/load-user-by-email-repository";
import { UnauthorizedException } from "../../../domain/use-cases/errors/unauthorized-exception";
import { CreateUserWithFacebookUseCase } from "../../../domain/use-cases/user/create-user-with-facebook-use-case";
import { AuthFacade } from "../../protocols/auth/auth-facade";

export class CreateUserWithFacebookUseCaseImpl
  implements CreateUserWithFacebookUseCase
{
  constructor(
    private readonly loadFacebookUser: LoadFacebookUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authFacade: AuthFacade,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async handle(
    request: CreateUserWithFacebookUseCase.Params,
  ): Promise<CreateUserWithFacebookUseCase.Response> {
    const facebookUser = await this.loadFacebookUser.loadUser({
      accessToken: request.accessToken,
    });
    if (!facebookUser.success || !facebookUser.user) {
      throw new UnauthorizedException();
    }
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      facebookUser.user.email,
    );
    if (userExists) {
      const { accessToken } = await this.authFacade.signAccessToken(
        userExists.id,
      );
      const { refreshToken } = await this.authFacade.signRefreshToken(
        userExists.id,
      );
      return { accessToken, refreshToken, user: userExists };
    }
    const user = await this.createUserRepository.create({
      email: facebookUser.user.email,
      firstName: facebookUser.user.firstName,
      lastName: facebookUser.user.lastName,
    });
    const { refreshToken } = await this.authFacade.signRefreshToken(user.id);
    const { accessToken } = await this.authFacade.signAccessToken(user.id);
    return { accessToken, refreshToken, user };
  }
}
