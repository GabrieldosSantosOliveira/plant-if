import { UserModel } from "../../entities/user";

export interface AuthenticateUserWithEmailUseCase {
  handle(
    credentials: AuthenticateUserWithEmailUseCase.Params,
  ): Promise<AuthenticateUserWithEmailUseCase.Response>;
}
export declare module AuthenticateUserWithEmailUseCase {
  export interface Params {
    email: string;
    password: string;
  }
  export interface Response {
    accessToken: string;
    refreshToken: string;
    user: UserModel;
  }
}
