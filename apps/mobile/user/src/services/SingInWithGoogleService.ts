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
export class SingInWithGoogleService {
  constructor(private readonly httpService: HttpService) {}
  async singIn(accessToken: string) {
    const { data, statusCode } = await this.httpService.post<AuthDto>(
      new URL('/api/user/google', env.BASE_URL).toString(),
      {
        body: {
          accessToken,
        },
      },
    )
    switch (statusCode) {
      case HttpStatusCode.OK:
        return { data, statusCode }
        break
      default:
        throw new UnexpectedError()
        break
    }
  }
}
