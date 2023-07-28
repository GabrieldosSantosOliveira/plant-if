import { makeApiUrl } from '@/constants/make-api-url'
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
  constructor(private readonly httpClient: HttpClient) {}
  async execute(
    credentials: AuthWithEmailRepositoryDto,
  ): Promise<Either<Exception, AuthWithEmailRepositoryResponse>> {
    try {
      const response = await this.httpClient.post<Response>(
        makeApiUrl('/api/user/auth/sing-in/email'),
        {
          body: {
            email: credentials.email,
            password: credentials.password,
          },
        },
      )
      console.log()
      if (response.statusCode === HttpStatusCode.NOT_FOUND) {
        return left(new UserNotFoundException())
      }
      if (response.statusCode === HttpStatusCode.UNAUTHORIZED_ERROR) {
        return left(new AccessDeniedException())
      }
      if (response.statusCode !== HttpStatusCode.OK) {
        return left(new UnexpectedException())
      }
      return right({
        user: UserMapper.toUI(response.data.user),
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    } catch {
      return left(new UnexpectedException())
    }
  }
}
