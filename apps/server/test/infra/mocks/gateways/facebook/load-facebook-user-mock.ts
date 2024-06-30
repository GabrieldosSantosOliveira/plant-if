import {
  FacebookAccount,
  LoadFacebookUser,
  LoadFacebookUserRequest,
  LoadFacebookUserResponse,
} from "../../../../../src/domain/contracts/gateways/facebook/load-facebook-user";
import { mockValues } from "../../../../mock/mock-values";

export class LoadFacebookUserMock implements LoadFacebookUser {
  public accessToken: string;
  public user: FacebookAccount | null;
  public email: string | null;
  public success = true;
  async loadUser({
    accessToken,
  }: LoadFacebookUserRequest): Promise<LoadFacebookUserResponse> {
    this.accessToken = accessToken;
    this.user = {
      email: this.email || mockValues.email,
      lastName: mockValues.lastName,
      firstName: mockValues.firstName,
      id: mockValues.uuid,
      picture: mockValues.url,
    };
    return {
      success: this.success,
      user: this.user,
    };
  }
}
export const makeLoadFacebookUserMock = () => {
  const loadFacebookUserMock = new LoadFacebookUserMock();
  return { loadFacebookUserMock };
};

export class LoadFacebookUserMockWithException implements LoadFacebookUser {
  async loadUser(): Promise<LoadFacebookUserResponse> {
    throw new Error();
  }
}
export const makeLoadFacebookUserMockWithException = () => {
  const loadFacebookUserMockWithException =
    new LoadFacebookUserMockWithException();
  return { loadFacebookUserMockWithException };
};
