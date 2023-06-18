import {
  GoogleAccount,
  LoadGoogleUser,
  LoadGoogleUserRequest,
} from '@/app/repositories/google/load-google-user'
import { HttpService } from '@/interfaces/http/http-service'
import { UnauthorizedException } from '@/presentation/errors/exceptions/unauthorized-exception'
export interface GoogleResponseAccount {
  email: string
  email_verified: string
  name: string
  picture: string
  given_name: string
  family_name: string
  id: string
}
export class LoadGoogleUserImpl implements LoadGoogleUser {
  constructor(private readonly httpService: HttpService) {}
  async loadUser({
    accessToken,
  }: LoadGoogleUserRequest): Promise<GoogleAccount> {
    try {
      const { data } = await this.httpService.get<GoogleResponseAccount>(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return {
        email: data.email,
        given_name: data.given_name,
        id: data.id,
        family_name: data.family_name,
        picture: data.picture,
      }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
