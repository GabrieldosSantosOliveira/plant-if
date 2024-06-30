import {
  GoogleAccount,
  LoadGoogleUser,
  LoadGoogleUserRequest,
  LoadGoogleUserResponse,
} from "../../../../../src/domain/contracts/gateways/google/load-google-user";
import { mockValues } from "../../../../mock/mock-values";

export class LoadGoogleUserMock implements LoadGoogleUser {
  public accessToken: string;
  public email: string | null;
  public user: GoogleAccount | null;
  public success = true;
  async loadUser({
    accessToken,
  }: LoadGoogleUserRequest): Promise<LoadGoogleUserResponse> {
    this.accessToken = accessToken;
    this.user = {
      email: this.email || mockValues.email,
      family_name: mockValues.lastName,
      given_name: mockValues.firstName,
      id: mockValues.uuid,
      picture: mockValues.url,
    };
    return {
      success: this.success,
      user: this.user,
    };
  }
}
export const makeLoadGoogleUserMock = () => {
  const loadGoogleUserMock = new LoadGoogleUserMock();
  return { loadGoogleUserMock };
};

export class LoadGoogleUserMockWithError implements LoadGoogleUser {
  async loadUser(): Promise<LoadGoogleUserResponse> {
    throw new Error();
  }
}
export const makeLoadGoogleUserMockWithError = () => {
  const loadGoogleUserMockWithError = new LoadGoogleUserMockWithError();
  return { loadGoogleUserMockWithError };
};
