import { HttpClient } from '@/data/protocols/http/http-client'
import { AuthAppleUser } from '@/domain/contracts/gateways/apple/auth-apple-user'

export class AuthAppleUserImpl implements AuthAppleUser {
  private readonly URL_ENDPOINT_APPLE_AUTH_TOKEN =
    'https://appleid.apple.com/auth/token'

  constructor(
    private readonly httpClient: HttpClient,
    private readonly clientSecret: string,
    private readonly clientId: string,
  ) {}

  async authenticate(code: string): Promise<boolean> {
    const payload = {
      code,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      client_id: this.clientId,
    }
    const validate = await this.httpClient.post(
      this.URL_ENDPOINT_APPLE_AUTH_TOKEN,
      {
        headers: {
          ContentType: 'application/x-www-form-urlencoded',
        },
        body: payload,
      },
    )
    if (validate.statusCode === 200) {
      return true
    }
    return false
  }
}
