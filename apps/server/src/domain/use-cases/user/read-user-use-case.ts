import { UserModel } from "../../entities/user";

export interface ReadUserUseCase {
  handle(params: ReadUserUseCase.Params): Promise<ReadUserUseCase.Response>;
}
export declare module ReadUserUseCase {
  export interface Params {
    id: number;
  }
  export interface Response
    extends Omit<UserModel, "role" | "password" | "resetPasswordSecret"> {}
}
