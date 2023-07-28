import { makeApiUrl } from '@/constants/make-api-url'
import { HttpClient } from '@/data/protocols/http/http-client'
import {
  ForgotPasswordRepository,
  ForgotPasswordRepositoryDto,
} from '@/domain/repositories/forgot-password-repository'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedException } from '@/domain/use-cases/errors/unexpected-exception'
import { UserNotFoundException } from '@/domain/use-cases/errors/user-not-found-exception'
import { HttpStatusCode } from '@/helpers/http/http-status-code'
import { Either, left, right } from '@/shared/either'

export class ForgotPasswordRepositoryImpl implements ForgotPasswordRepository {
  constructor(private readonly httpClient: HttpClient) {}
  async execute(
    data: ForgotPasswordRepositoryDto,
  ): Promise<Either<Exception, null>> {
    try {
      const response = await this.httpClient.post<Response>(
        makeApiUrl('/api/user/auth/forgot-password'),
        {
          body: {
            email: data.email,
          },
        },
      )
      if (response.statusCode === HttpStatusCode.NOT_FOUND) {
        return left(new UserNotFoundException())
      }
      if (response.statusCode !== HttpStatusCode.NO_CONTENT) {
        return left(new UnexpectedException())
      }
      return right(null)
    } catch {
      return left(new UnexpectedException())
    }
  }
}
