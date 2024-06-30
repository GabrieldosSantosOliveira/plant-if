import { CreateUserRepository } from "../../../../../src/domain/contracts/repositories/user/create-user-repository";
import { LoadUserByEmailRepository } from "../../../../../src/domain/contracts/repositories/user/load-user-by-email-repository";
import { LoadUserByIdRepository } from "../../../../../src/domain/contracts/repositories/user/load-user-by-id-repository";
import { UpdateUserRepository } from "../../../../../src/domain/contracts/repositories/user/update-user-repository";
import { UserModel, UserRoles } from "../../../../../src/domain/entities/user";

export class InMemoryUserRepository
  implements
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    CreateUserRepository,
    UpdateUserRepository
{
  private users: UserModel[] = [];
  async create(
    user: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Response> {
    const rawUser: UserModel = {
      id: this.users.length + 1,
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRoles.STUDENT,
      password: user.password,
    };
    this.users.push(rawUser);
    return rawUser;
  }
  async findById(id: number): Promise<LoadUserByIdRepository.Response | null> {
    const userExists = this.users.find((user) => user.id === id);
    if (!userExists) {
      return null;
    }
    return userExists;
  }

  async findByEmail(
    email: string,
  ): Promise<LoadUserByEmailRepository.Response | null> {
    const userExists = this.users.find((user) => user.email === email);
    if (!userExists) {
      return null;
    }
    return userExists;
  }

  async save(user: UserModel): Promise<void> {
    const userIndex = this.users.findIndex(({ email }) => email === user.email);
    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}
export const makeInMemoryUserRepository = () => {
  const inMemoryUserRepository = new InMemoryUserRepository();
  return { inMemoryUserRepository };
};
