import {
  type GoogleAccount,
  type LoadGoogleUser,
  type LoadGoogleUserRequest,
  type LoadGoogleUserResponse,
} from "@/domain/contracts/gateways/google/load-google-user";
import { faker } from "@faker-js/faker";

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
      email: this.email || faker.internet.email(),
      family_name: faker.person.lastName(),
      given_name: faker.person.firstName(),
      id: faker.string.uuid(),
      picture: faker.internet.url(),
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
