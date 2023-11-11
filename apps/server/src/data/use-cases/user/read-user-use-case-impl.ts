import { LoadUserByIdRepository } from '@/domain/contracts/repositories/user/load-user-by-id-repository'
import { User } from '@/domain/entities/user'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { ReadUserUseCase } from '@/domain/use-cases/user/read-user-use-case'
import { Either, left, right } from '@/shared/either'

export class ReadUserUseCaseImpl implements ReadUserUseCase {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async handle(id: string): Promise<Either<Exception, User>> {
    const user = await this.loadUserByIdRepository.findById(id)
    if (!user) {
      return left(new UserNotFoundException())
    }
    return right(user)
  }
}
