import { env } from '@/constants/env'
import { UnexpectedError } from '@/errors/UnexpectedError'
import { HttpStatusCode } from '@/helpers/http/HttpStatusCode'
import { HttpService } from '@/interfaces/http/HttpService'
import { AccessTokenDto } from '@/models/AccessTokenDto'
import { RefreshTokenDto } from '@/models/RefreshTokenDto'
import { UserDto } from '@/models/UserDto'
export interface AuthDto extends AccessTokenDto, RefreshTokenDto {
  user: UserDto
}
export class SingInWithFacebookService {
  constructor(private readonly httpService: HttpService) {}
  async singIn(accessToken: string) {
    const { data, statusCode } = await this.httpService.post<AuthDto>(
      new URL('/api/user/facebook', env.BASE_URL).toString(),
      {
        body: {
          accessToken,
        },
      },
    )
    switch (statusCode) {
      case HttpStatusCode.CONFLICT:
        return { data, statusCode }
      default:
        throw new UnexpectedError()
    }
  }
}
