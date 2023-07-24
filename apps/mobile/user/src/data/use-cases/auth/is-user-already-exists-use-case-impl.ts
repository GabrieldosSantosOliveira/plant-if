import { makeApiUrl } from '@/constants/make-api-url'
import { HttpClient } from '@/data/protocols/http/http-client'
import { Exception } from '@/domain/use-cases/errors/exception'
import { UnexpectedError } from '@/domain/use-cases/errors/unexpected-error'
import {
  IsUserAlreadyExistsUseCase,
  IsUserAlreadyExistsUseCaseResponse,
  UserUiModelProvider,
} from '@/domain/use-cases/is-user-already-exists-use-case'
import { Either, left, right } from '@/shared/either'
interface Response {
  userExists: boolean
  provider?: UserUiModelProvider
}
export class IsUserAlreadyExistsUseCaseImpl
  implements IsUserAlreadyExistsUseCase
{
  constructor(private readonly httpClient: HttpClient) {}
  async execute(
    email: string,
  ): Promise<Either<Exception, IsUserAlreadyExistsUseCaseResponse>> {
    const { data, statusCode } = await this.httpClient.post<Response>(
      makeApiUrl('/api/user/exists'),
      {
        body: {
          email,
        },
      },
    )
    if (statusCode !== 200) {
      return left(new UnexpectedError())
    }
    return right({
      userExists: data.userExists,
      provider: data.provider,
    })
  }
}
