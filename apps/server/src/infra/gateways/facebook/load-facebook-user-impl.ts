import {
  HttpClient,
  HttpClientResponse,
} from "@/data/protocols/http/http-client";
import {
  LoadFacebookUser,
  LoadFacebookUserRequest,
  LoadFacebookUserResponse,
} from "@/domain/contracts/gateways/facebook/load-facebook-user";

export interface Picture {
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  };
}
export interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: Picture;
}

export class LoadFacebookUserImpl implements LoadFacebookUser {
  private BASE_URL = "https://graph.facebook.com/";
  constructor(private readonly httpClient: HttpClient) {}

  async loadUser({
    accessToken,
  }: LoadFacebookUserRequest): Promise<LoadFacebookUserResponse> {
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
        firstName: response.data.first_name,
        id: response.data.id,
        lastName: response.data.last_name,
        picture: response.data.picture.data.url,
      },
    };
  }

  private async getUserInfo(
    clientToken: string,
  ): Promise<HttpClientResponse<UserInfo>> {
    const response = await this.httpClient.get<UserInfo>(
      new URL("/me", this.BASE_URL).toString(),
      {
        params: {
          fields: ["id", "first_name", "last_name", "picture", "email"].join(
            ",",
          ),
          access_token: clientToken,
        },
      },
    );
    return response;
  }
}
