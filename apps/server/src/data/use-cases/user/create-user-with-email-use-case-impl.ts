import { CreateUserRepository } from "../../../domain/contracts/repositories/user/create-user-repository";
import { LoadUserByEmailRepository } from "../../../domain/contracts/repositories/user/load-user-by-email-repository";
import { UserAlreadyExistsException } from "../../../domain/use-cases/errors/user-already-exists-exception";
import { CreateUserWithEmailUseCase } from "../../../domain/use-cases/user/create-user-with-email-use-case";
import { AuthFacade } from "../../protocols/auth/auth-facade";
import { Bcrypt } from "../../protocols/cryptography/bcrypt";

export class CreateUserWithEmailUseCaseImpl
  implements CreateUserWithEmailUseCase
{
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authFacade: AuthFacade,
    private readonly createUserRepository: CreateUserRepository,
    private readonly bcrypt: Bcrypt,
  ) {}

  async handle(
    request: CreateUserWithEmailUseCase.Params,
  ): Promise<CreateUserWithEmailUseCase.Response> {
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      request.email,
    );
    if (userExists) {
      throw new UserAlreadyExistsException();
    }
    const passwordHash = await this.bcrypt.hash(request.password);

    const user = await this.createUserRepository.create({
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: passwordHash,
    });
    const { refreshToken } = await this.authFacade.signRefreshToken(user.id);
    const { accessToken } = await this.authFacade.signAccessToken(user.id);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
