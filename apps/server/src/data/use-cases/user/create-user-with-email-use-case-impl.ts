import { AuthService } from '@/data/protocols/auth/auth-service'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { User } from '@/domain/entities/user'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UserAlreadyExistsException } from '@/domain/use-cases/errors/user-already-exists-exception'
import {
  CreateUserWithEmailUseCase,
  CreateUserWithEmailUseCaseRequest,
  CreateUserWithEmailUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-email-use-case'
import { Either, Right, left } from '@/shared/either'

export class CreateUserWithEmailUseCaseImpl
  implements CreateUserWithEmailUseCase
{
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly generatorUUID: GeneratorUUID,
    private readonly hasher: Hasher,
  ) {}

  async handle(
    request: CreateUserWithEmailUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithEmailUseCaseResponse>> {
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      request.email,
    )
    if (userExists) {
      return left(new UserAlreadyExistsException())
    }
    const passwordHash = await this.hasher.hash(request.password)
    const user = new User({
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      id: this.generatorUUID.randomUUID(),
      password: passwordHash,
    })
    await this.createUserRepository.create(user)
    const { refreshToken } = await this.authService.generateRefreshToken(
      user.id,
    )
    const { accessToken } = await this.authService.generateAccessToken(user.id)
    return new Right({ accessToken, refreshToken, user })
  }
}
