import { User } from "@/domain/entities/user";

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      lastName: user.lastName,
      image: user.image,
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
