import { UserModel } from "../../../entities/user";

export interface LoadUserByEmailRepository {
  findByEmail(
    email: string,
  ): Promise<LoadUserByEmailRepository.Response | null>;
}
export namespace LoadUserByEmailRepository {
  export interface Response extends UserModel {}
}
