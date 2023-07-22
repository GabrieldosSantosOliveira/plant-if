import { AuthService } from '@/data/protocols/auth/auth-service'
import { AuthAppleUser } from '@/domain/contracts/gateways/apple/auth-apple-user'
import { GeneratorUUID } from '@/domain/contracts/gateways/uuid/generator-uuid'
import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { LoadUserByEmailRepository } from '@/domain/contracts/repositories/user/load-user-by-email-repository'
import { User } from '@/domain/entities/user'
import { BadRequestException } from '@/domain/use-cases/errors/bad-request-exception'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import {
  CreateUserWithAppleUseCase,
  CreateUserWithAppleUseCaseRequest,
  CreateUserWithAppleUseCaseResponse,
} from '@/domain/use-cases/user/create-user-with-apple'
import { Either, left, right } from '@/shared/either'

export class CreateUserWithAppleUseCaseImpl
  implements CreateUserWithAppleUseCase
{
  constructor(
    private readonly authAppleUser: AuthAppleUser,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly authService: AuthService,
    private readonly createUserRepository: CreateUserRepository,
    private readonly generatorUUID: GeneratorUUID,
  ) {}

  async handle(
    request: CreateUserWithAppleUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithAppleUseCaseResponse>> {
    const isUserAuthenticated = await this.authAppleUser.authenticate(
      request.code,
    )
    if (!isUserAuthenticated) {
      return left(new UnauthorizedException())
    }
    const userExists = await this.loadUserByEmailRepository.findByEmail(
      request.email,
    )
    if (userExists) {
      const { accessToken, refreshToken } =
        await this.authService.generateAccessTokenAndRefreshToken(userExists.id)
      return right({ accessToken, refreshToken, user: userExists })
    }
    if (!request.firstName || !request.lastName) {
      return left(
        new BadRequestException({
          description:
            'should be provided firstName and lastName if user not exists already',
        }),
      )
    }
    const user = new User({
      email: request.email,
      id: this.generatorUUID.randomUUID(),
      firstName: request.firstName,
      lastName: request.lastName,
    })
    await this.createUserRepository.create(user)
    const { accessToken, refreshToken } =
      await this.authService.generateAccessTokenAndRefreshToken(user.id)
    return right({ accessToken, refreshToken, user })
  }
}
