import { HttpClient } from '@/data/protocols/http/http-client'
import {
  ResetPasswordRepository,
  ResetPasswordRepositoryDto,
} from '@/domain/repositories/reset-password-repository'
import { AccessDeniedException } from '@/domain/use-cases/errors/access-denied-exception'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { Either, left, right } from '@/shared/either'

export class ResetPasswordRepositoryImpl implements ResetPasswordRepository {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(
    data: ResetPasswordRepositoryDto,
  ): Promise<Either<Exception, null>> {
    const response = await this.httpClient.post<null>(this.url, {
      body: {
        email: data.email,
        code: data.code,
        resetPassword: data.resetPassword,
      },
    })
    if (response.statusCode === HttpStatusCode.NOT_FOUND) {
      return left(new UserNotFoundException())
    }
    if (response.statusCode === HttpStatusCode.UNAUTHORIZED_ERROR) {
      return left(new AccessDeniedException())
    }
    if (response.statusCode !== HttpStatusCode.NO_CONTENT) {
      return left(new UnexpectedException())
    }
    return right(null)
  }
}
