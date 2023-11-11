import { TimeBasedOnTimePassword } from '@/data/protocols/cryptography/time-based-one-time-password'
import { SendMail } from '@/domain/contracts/gateways/email/send-mail'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { UpdateUserRepository } from '@/domain/contracts/repositories/user/update-user-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import {
  ForgotPasswordUseCase,
  ForgotPasswordUseCaseRequest,
} from '@/domain/use-cases/user/forgot-password-use-case'
import { Either, left, right } from '@/shared/either'
export class ForgotPasswordUseCaseImpl implements ForgotPasswordUseCase {
  private readonly PASSWORD_DURATION_IN_SECONDS = 60
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly sendEmail: SendMail,
    private readonly timeBasedOnTimePassword: TimeBasedOnTimePassword,
  ) {}

  async handle(
    request: ForgotPasswordUseCaseRequest,
  ): Promise<Either<Exception, null>> {
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      request.email,
    )
    if (!userExists) {
      return left(new UserNotFoundException())
    }
    const secret = await this.timeBasedOnTimePassword.generateSecret()

    userExists.resetPasswordSecret = secret
    await this.updateUserRepository.save(userExists)
    const password = await this.timeBasedOnTimePassword.generatePassword(
      secret,
      this.PASSWORD_DURATION_IN_SECONDS,
    )
    await this.sendEmail.send({
      body: `Código para troca de senha ${password}`,
      from: {
        name: 'Equipe de suporte',
        email: '<no_reply@plantif.com>',
      },
      subject: 'PlantIf: recuperação de senha, confira seu código de acesso.',
      to: userExists.email,
    })
    return right(null)
  }
}
