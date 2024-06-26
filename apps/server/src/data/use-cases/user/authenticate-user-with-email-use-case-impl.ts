import { AuthService } from "@/data/protocols/auth/auth-service";
import { Bcrypt } from "@/data/protocols/cryptography/bcrypt";
import { LoadUserByEmailRepository } from "@/domain/contracts/repositories/user/load-user-by-email-repository";
import { Exception } from "@/domain/use-cases/errors/exception";
import { UnauthorizedException } from "@/domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "@/domain/use-cases/errors/user-not-found-exception";
import {
  AuthenticateUserWithEmailUseCase,
  AuthenticateUserWithEmailUseCaseRequest,
  AuthenticateUserWithEmailUseCaseResponse,
} from "@/domain/use-cases/user/authenticate-user-with-email-use-case";
import { Either, left, right } from "@/shared/either";

export class AuthenticateUserWithEmailUseCaseImpl
  implements AuthenticateUserWithEmailUseCase
{
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly bcrypt: Bcrypt,
    private readonly authService: AuthService,
  ) {}

  async handle(
    credentials: AuthenticateUserWithEmailUseCaseRequest,
  ): Promise<Either<Exception, AuthenticateUserWithEmailUseCaseResponse>> {
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      credentials.email,
    );
    if (!userExists) {
      return left(new UserNotFoundException());
    }
    if (!userExists.password) {
      return left(new UnauthorizedException());
    }
    const passwordMatch = await this.bcrypt.compare(
      credentials.password,
      userExists.password,
    );
    if (!passwordMatch) {
      return left(new UnauthorizedException());
    }
    const { accessToken } = await this.authService.generateAccessToken(
      userExists.id,
    );
    const { refreshToken } = await this.authService.generateRefreshToken(
      userExists.id,
    );
    return right({
      accessToken,
      refreshToken,
      user: userExists,
    });
  }
}
