import { HttpClient } from "@/data/protocols/http/http-client";
import {
  LoadGoogleUser,
  LoadGoogleUserRequest,
  LoadGoogleUserResponse,
} from "@/domain/contracts/gateways/google/load-google-user";

export interface GoogleResponseAccount {
  email: string;
  email_verified: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  id: string;
}
export class LoadGoogleUserImpl implements LoadGoogleUser {
  constructor(private readonly httpClient: HttpClient) {}
  async loadUser({
    accessToken,
  }: LoadGoogleUserRequest): Promise<LoadGoogleUserResponse> {
    const response = await this.getUserInfo(accessToken);
    if (response.statusCode !== 200) {
      return {
        success: false,
        user: null,
      };
    }
    return {
      success: true,
      user: {
        email: response.data.email,
        given_name: response.data.given_name,
        id: response.data.id,
        family_name: response.data.family_name,
        picture: response.data.picture,
      },
    };
  }

  private async getUserInfo(accessToken: string) {
    return await this.httpClient.get<GoogleResponseAccount>(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}
