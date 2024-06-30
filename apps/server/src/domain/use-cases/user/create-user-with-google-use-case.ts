import { UserModel } from "../../entities/user";

export interface CreateUserWithGoogleUseCase {
  handle(
    request: CreateUserWithGoogleUseCase.Params,
  ): Promise<CreateUserWithGoogleUseCase.Response>;
}
export declare module CreateUserWithGoogleUseCase {
  export interface Params {
    accessToken: string;
  }
  export interface Response {
    accessToken: string;
    refreshToken: string;
    user: UserModel;
  }
}
