import { SendMail } from '@/domain/contracts/gateways/email/send-mail'
import { GenerateRandomNumber } from '@/domain/contracts/gateways/random-number/generate-random-number'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { UpdateUserRepository } from '@/domain/contracts/repositories/user/update-user-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import {
  ForgotPasswordUseCase,
  ForgotPasswordUseCaseRequest,
} from '@/domain/use-cases/user/forgot-password-use-case'
import { Either, left, right } from '@/shared/either'
import { makeDateWithMoreHours } from '@/utils/date/make-date-with-more-hours'

export class ForgotPasswordUseCaseImpl implements ForgotPasswordUseCase {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly sendEmail: SendMail,
    private readonly generateRandomNumber: GenerateRandomNumber,
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
    userExists.resetPasswordExpires = new Date(makeDateWithMoreHours(2))
    const resetPasswordToken = (
      await this.generateRandomNumber.generate(6)
    ).toString()

    userExists.resetPasswordToken = resetPasswordToken
    await this.updateUserRepository.save(userExists)
    await this.sendEmail.send({
      body: `Código para troca de senha ${userExists.resetPasswordToken}`,
      from: {
        name: 'Equipe de suporte',
        email: '<no_reply@plantif.com>',
      },
      subject: 'Esqueceu a senha',
      to: userExists.email,
    })
    return right(null)
  }
}
