import { UserModel } from "../../../entities/user";

export interface UpdateUserRepository {
  save(user: UpdateUserRepository.Params): Promise<void>;
}
export namespace UpdateUserRepository {
  export interface Params extends Omit<UserModel, "id"> {}
}
