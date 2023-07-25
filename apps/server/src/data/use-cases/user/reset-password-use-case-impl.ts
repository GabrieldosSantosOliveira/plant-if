import { Hasher } from '@/data/protocols/cryptography/hasher'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { UpdateUserRepository } from '@/domain/contracts/repositories/user/update-user-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import {
  ResetPasswordUseCase,
  ResetPasswordUseCaseRequest,
} from '@/domain/use-cases/user/reset-password-use-case'
import { Either, left, right } from '@/shared/either'

export class ResetPasswordUseCaseImpl implements ResetPasswordUseCase {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly hasher: Hasher,
  ) {}

  async handle(
    data: ResetPasswordUseCaseRequest,
  ): Promise<Either<Exception, null>> {
    const user = await this.loadUserByEmailRepository.findByEmail(data.email)
    if (!user) {
      return left(new UserNotFoundException())
    }
    if (!user.resetPasswordExpires || !user.resetPasswordToken) {
      return left(new UnauthorizedException())
    }
    if (data.code !== user.resetPasswordToken) {
      return left(new UnauthorizedException())
    }
    const dateNow = new Date(Date.now())
    if (dateNow.getTime() > user.resetPasswordExpires.getTime()) {
      return left(new UnauthorizedException())
    }
    user.resetPasswordExpires = undefined
    user.resetPasswordToken = undefined
    user.updatedAt = new Date(Date.now())
    const passwordHash = await this.hasher.hash(data.resetPassword)
    user.password = passwordHash
    await this.updateUserRepository.save(user)
    return right(null)
  }
}
