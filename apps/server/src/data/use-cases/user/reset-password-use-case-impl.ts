import { Hasher } from "@/data/protocols/cryptography/hasher";
import { TimeBasedOnTimePassword } from "@/data/protocols/cryptography/time-based-one-time-password";
import { LoadUserByEmailRepository } from "@/domain/contracts/repositories/user/load-user-by-email-repository";
import { UpdateUserRepository } from "@/domain/contracts/repositories/user/update-user-repository";
import { Exception } from "@/domain/use-cases/errors/exception";
import { UnauthorizedException } from "@/domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "@/domain/use-cases/errors/user-not-found-exception";
import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseRequest,
} from "@/domain/use-cases/user/reset-password-use-case";
import { Either, left, right } from "@/shared/either";

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  private readonly PASSWORD_DURATION_IN_SECONDS = 60;

  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly hasher: Hasher,
    private readonly timeBasedOnTimePassword: TimeBasedOnTimePassword,
  ) {}

  async handle(
    data: ResetPasswordUseCaseRequest,
  ): Promise<Either<Exception, null>> {
    const user = await this.loadUserByEmailRepository.findByEmail(data.email);
    if (!user) {
      return left(new UserNotFoundException());
    }
    if (!user.resetPasswordSecret) {
      return left(new UnauthorizedException());
    }
    const isValidPassword = await this.timeBasedOnTimePassword.verify(
      user.resetPasswordSecret,
      data.code,
      this.PASSWORD_DURATION_IN_SECONDS,
    );
    if (!isValidPassword) {
      return left(new UnauthorizedException());
    }
    const passwordHash = await this.hasher.hash(data.resetPassword);
    user.password = passwordHash;
    await this.updateUserRepository.save(user);

    return right(null);
  }
}
