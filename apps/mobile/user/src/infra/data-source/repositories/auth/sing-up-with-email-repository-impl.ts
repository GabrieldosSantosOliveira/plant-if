import { HttpClient } from '@/data/protocols/http/http-client'
import {
  SingUpWithEmailRepository,
  SingUpWithEmailRepositoryDto,
  SingUpWithEmailRepositoryResponse,
} from '@/domain/repositories/sing-up-with-email-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserAlreadyExistsException } from '@/domain/use-cases/errors/user-already-exists-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { Either, left, right } from '@/shared/either'

import { AccessTokenDto } from '../../dtos/access-token-dto'
import { RefreshTokenDto } from '../../dtos/refresh-token-dto'
import { UserDto } from '../../dtos/user-dto'
import { UserMapper } from '../../mappers/user-mapper'
interface Response extends AccessTokenDto, RefreshTokenDto {
  user: UserDto
}
export class SingUpWithEmailRepositoryImpl
  implements SingUpWithEmailRepository
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(
    data: SingUpWithEmailRepositoryDto,
  ): Promise<Either<Exception, SingUpWithEmailRepositoryResponse>> {
    const response = await this.httpClient.post<Response>(this.url, {
      body: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })
    if (response.statusCode === HttpStatusCode.CONFLICT) {
      return left(new UserAlreadyExistsException())
    }
    if (response.statusCode !== HttpStatusCode.CREATED) {
      return left(new UnexpectedException())
    }
    return right({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      user: UserMapper.toUI(response.data.user),
    })
  }
}
