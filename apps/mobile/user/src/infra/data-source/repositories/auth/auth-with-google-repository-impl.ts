import { HttpClient } from '@/data/protocols/http/http-client'
import {
  AuthWithGoogleRepository,
  AuthWithGoogleRepositoryResponse,
} from '@/domain/repositories/auth-with-google-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { Either, left, right } from '@/shared/either'

import { AccessTokenDto } from '../../dtos/access-token-dto'
import { RefreshTokenDto } from '../../dtos/refresh-token-dto'
import { UserDto } from '../../dtos/user-dto'
import { UserMapper } from '../../mappers/user-mapper'
interface Response extends AccessTokenDto, RefreshTokenDto {
  user: UserDto
}
export class AuthWithGoogleRepositoryImpl implements AuthWithGoogleRepository {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(
    accessToken: string,
  ): Promise<Either<Exception, AuthWithGoogleRepositoryResponse>> {
    const { data, statusCode } = await this.httpClient.post<Response>(
      this.url,
      {
        body: {
          accessToken,
        },
      },
    )
    if (statusCode !== HttpStatusCode.OK) {
      return left(new UnexpectedException())
    }
    return right({
      user: UserMapper.toUI(data.user),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })
  }
}
