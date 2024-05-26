import { User } from "@/domain/entities/user";

export interface UpdateUserRepository {
  save(user: User): Promise<void>;
}
