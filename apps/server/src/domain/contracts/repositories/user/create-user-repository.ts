import { User } from "@/domain/entities/user";

export interface CreateUserRepository {
  create(user: User): Promise<void>;
}
