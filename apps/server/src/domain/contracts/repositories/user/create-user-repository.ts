import { UserModel } from "../../../entities/user";

export interface CreateUserRepository {
  create(
    user: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Response>;
}
export declare module CreateUserRepository {
  export interface Params {
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
  }
  export interface Response extends UserModel {}
}
