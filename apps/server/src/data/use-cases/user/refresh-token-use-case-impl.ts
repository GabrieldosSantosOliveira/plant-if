import { AuthService } from '@/data/protocols/auth/auth-service'
import { LoadUserByIdRepository } from '@/domain/contracts/repositories/user/load-user-by-id-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnauthorizedException } from '@/domain/use-cases/errors/unauthorized-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import {
  RefreshTokenUseCase,
  RefreshTokenUseCaseRequestDto,
  RefreshTokenUseCaseResponseDto,
} from '@/domain/use-cases/user/refresh-token-use-case'
import { Either, left, right } from '@/shared/either'

export class RefreshTokenUseCaseImpl implements RefreshTokenUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async handle({
    refreshToken,
  }: RefreshTokenUseCaseRequestDto): Promise<
    Either<Exception, RefreshTokenUseCaseResponseDto>
  > {
    const isValidRefreshToken = await this.authService.decryptRefreshToken(
      refreshToken,
    )
    if (isValidRefreshToken.isLeft()) {
      return left(new UnauthorizedException())
    }
    const userExists = await this.loadUserByIdRepository.findById(
      isValidRefreshToken.value.sub,
    )
    if (!userExists) {
      return left(new UserNotFoundException())
    }
    const { accessToken } = await this.authService.generateAccessToken(
      userExists.id,
    )
    return right({
      accessToken,
    })
  }
}
