import { UserModel } from "../../entities/user";

export interface CreateUserWithFacebookUseCase {
  handle(
    request: CreateUserWithFacebookUseCase.Params,
  ): Promise<CreateUserWithFacebookUseCase.Response>;
}
export declare module CreateUserWithFacebookUseCase {
  export interface Params {
    accessToken: string;
  }
  export interface Response {
    accessToken: string;
    refreshToken: string;
    user: UserModel;
  }
}
