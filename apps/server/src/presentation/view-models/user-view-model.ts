import { UserModel } from "../../domain/entities/user";

export class UserViewModel {
  static toHTTP(
    user: Omit<UserModel, "password" | "resetPasswordSecret" | "role">,
  ) {
    return {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
