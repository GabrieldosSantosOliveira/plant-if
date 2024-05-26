import { CreateUserRepository } from "@/domain/contracts/repositories/user/create-user-repository";
import { LoadUserByEmailRepository } from "@/domain/contracts/repositories/user/load-user-by-email-repository";
import { LoadUserByIdRepository } from "@/domain/contracts/repositories/user/load-user-by-id-repository";
import { UpdateUserRepository } from "@/domain/contracts/repositories/user/update-user-repository";
import { User } from "@/domain/entities/user";

export class InMemoryUserRepository
  implements
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    CreateUserRepository,
    UpdateUserRepository
{
  private users: User[] = [];
  async findById(id: string): Promise<User | null> {
    const userExists = this.users.find((user) => user.id === id);
    if (!userExists) {
      return null;
    }
    return userExists;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userExists = this.users.find((user) => user.email === email);
    if (!userExists) {
      return null;
    }
    return userExists;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(({ id }) => id === user.id);
    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
export const makeInMemoryUserRepository = () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  return { inMemoryUserRepository };
};
