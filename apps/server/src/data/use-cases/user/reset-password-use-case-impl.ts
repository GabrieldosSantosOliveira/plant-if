import { LoadUserByEmailRepository } from "../../../domain/contracts/repositories/user/load-user-by-email-repository";
import { UpdateUserRepository } from "../../../domain/contracts/repositories/user/update-user-repository";
import { UnauthorizedException } from "../../../domain/use-cases/errors/unauthorized-exception";
import { UserNotFoundException } from "../../../domain/use-cases/errors/user-not-found-exception";
import { ResetPasswordUseCase } from "../../../domain/use-cases/user/reset-password-use-case";
import { Bcrypt } from "../../protocols/cryptography/bcrypt";
import { TimeBasedOnTimePassword } from "../../protocols/cryptography/time-based-one-time-password";

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  private readonly PASSWORD_DURATION_IN_SECONDS = 60;

  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly bcrypt: Bcrypt,
    private readonly timeBasedOnTimePassword: TimeBasedOnTimePassword,
  ) {}

  async handle(
    data: ResetPasswordUseCase.Params,
  ): Promise<ResetPasswordUseCase.Response> {
    const user = await this.loadUserByEmailRepository.findByEmail(data.email);
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!user.resetPasswordSecret) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await this.timeBasedOnTimePassword.verify(
      user.resetPasswordSecret,
      data.code,
      this.PASSWORD_DURATION_IN_SECONDS,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const passwordHash = await this.bcrypt.hash(data.resetPassword);
    user.password = passwordHash;
    await this.updateUserRepository.save(user);
  }
}
