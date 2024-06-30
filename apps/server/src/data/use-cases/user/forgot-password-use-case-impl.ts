import { SendMail } from "../../../domain/contracts/gateways/email/send-mail";
import { LoadUserByEmailRepository } from "../../../domain/contracts/repositories/user/load-user-by-email-repository";
import { UpdateUserRepository } from "../../../domain/contracts/repositories/user/update-user-repository";
import { UserNotFoundException } from "../../../domain/use-cases/errors/user-not-found-exception";
import { ForgotPasswordUseCase } from "../../../domain/use-cases/user/forgot-password-use-case";
import { TimeBasedOnTimePassword } from "../../protocols/cryptography/time-based-one-time-password";

export class ForgotPasswordUseCaseImpl implements ForgotPasswordUseCase {
  private readonly PASSWORD_DURATION_IN_SECONDS = 60;
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly sendEmail: SendMail,
    private readonly timeBasedOnTimePassword: TimeBasedOnTimePassword,
  ) {}

  async handle(
    request: ForgotPasswordUseCase.Params,
  ): Promise<ForgotPasswordUseCase.Response> {
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      request.email,
    );
    if (!userExists) {
      throw new UserNotFoundException();
    }
    const secret = await this.timeBasedOnTimePassword.generateSecret();

    userExists.resetPasswordSecret = secret;
    await this.updateUserRepository.save(userExists);
    const password = await this.timeBasedOnTimePassword.generatePassword(
      secret,
      this.PASSWORD_DURATION_IN_SECONDS,
    );
    await this.sendEmail.send({
      body: `Código para troca de senha ${password}`,
      from: {
        name: "Equipe de suporte",
        email: "<no_reply@plantif.com>",
      },
      subject: "PlantIf: recuperação de senha, confira seu código de acesso.",
      to: userExists.email,
    });
  }
}
