import { AuthService } from '@/data/protocols/auth/auth-service'
import { LoadGoogleUser } from '@/domain/contracts/gateways/google/load-google-user'
import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { User } from '@/domain/entities/user'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import {
  CreateUserWithGoogleUseCase,
  CreateUserWithGoogleUseCaseRequest,
  CreateUserWithGoogleUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-google-use-case'
import { Either, left, right } from '@/shared/either'

export class CreateUserWithGoogleUseCaseImpl
  implements CreateUserWithGoogleUseCase
{
  constructor(
    private readonly loadGoogleUser: LoadGoogleUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly generatorUUID: GeneratorUUID,
  ) {}

  async handle(
    request: CreateUserWithGoogleUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithGoogleUseCaseResponse>> {
    const googleUser = await this.loadGoogleUser.loadUser({
      accessToken: request.accessToken,
    })
    if (!googleUser.success || !googleUser.user) {
      return left(new UnauthorizedException())
    }
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      googleUser.user.email,
    )
    if (userExists) {
      const { refreshToken } = await this.authService.generateRefreshToken(
        userExists.id,
      )
      const { accessToken } = await this.authService.generateAccessToken(
        userExists.id,
      )
      return right({ accessToken, refreshToken, user: userExists })
    }
    const user = new User({
      email: googleUser.user.email,
      firstName: googleUser.user.given_name,
      lastName: googleUser.user.family_name,
      image: googleUser.user.picture,
      id: this.generatorUUID.randomUUID(),
    })
    await this.createUserRepository.create(user)
    const { refreshToken } = await this.authService.generateRefreshToken(
      user.id,
    )
    const { accessToken } = await this.authService.generateAccessToken(user.id)
    return right({ accessToken, refreshToken, user })
  }
}
