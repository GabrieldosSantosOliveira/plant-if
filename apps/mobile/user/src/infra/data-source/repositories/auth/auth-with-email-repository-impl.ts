import { HttpClient } from '@/data/protocols/http/http-client'
import {
  AuthWithEmailRepository,
  AuthWithEmailRepositoryDto,
  AuthWithEmailRepositoryResponse,
} from '@/domain/repositories/auth-with-email-repository'
import { AccessDeniedException } from '@/domain/use-cases/errors/access-denied-exception'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { Either, left, right } from '@/shared/either'

import { AccessTokenDto } from '../../dtos/access-token-dto'
import { RefreshTokenDto } from '../../dtos/refresh-token-dto'
import { UserDto } from '../../dtos/user-dto'
import { UserMapper } from '../../mappers/user-mapper'

interface Response extends AccessTokenDto, RefreshTokenDto {
  user: UserDto
}
export class AuthWithEmailRepositoryImpl implements AuthWithEmailRepository {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(
    credentials: AuthWithEmailRepositoryDto,
  ): Promise<Either<Exception, AuthWithEmailRepositoryResponse>> {
    const response = await this.httpClient.post<Response>(this.url, {
      body: {
        email: credentials.email,
        password: credentials.password,
      },
    })
    switch (response.statusCode) {
      case HttpStatusCode.OK:
        return right({
          user: UserMapper.toUI(response.data.user),
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      case HttpStatusCode.NOT_FOUND:
        return left(new UserNotFoundException())
      case HttpStatusCode.UNAUTHORIZED_ERROR:
        return left(new AccessDeniedException())
      default:
        return left(new UnexpectedException())
    }
  }
}
