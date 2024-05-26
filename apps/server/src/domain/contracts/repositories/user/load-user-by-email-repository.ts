import { User } from "@/domain/entities/user";

export interface LoadUserByEmailRepository {
  findByEmail(email: string): Promise<User | null>;
}
