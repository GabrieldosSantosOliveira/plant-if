import { UserModel } from "../../../entities/user";

export interface LoadUserByIdRepository {
  findById(id: number): Promise<LoadUserByIdRepository.Response | null>;
}
export namespace LoadUserByIdRepository {
  export interface Response extends UserModel {}
}
