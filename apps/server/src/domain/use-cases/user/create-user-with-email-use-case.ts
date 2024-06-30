import { UserModel } from "../../entities/user";

export interface CreateUserWithEmailUseCase {
  handle(
    request: CreateUserWithEmailUseCase.Params,
  ): Promise<CreateUserWithEmailUseCase.Response>;
}
export declare module CreateUserWithEmailUseCase {
  export interface Params {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  export interface Response {
    accessToken: string;
    refreshToken: string;
    user: UserModel;
  }
}
