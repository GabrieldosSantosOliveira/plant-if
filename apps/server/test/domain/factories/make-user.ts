import { UserModel, UserRoles } from "../../../src/domain/entities/user";
import { mockValues } from "../../mock/mock-values";

export const makeUser = (user: Partial<UserModel> = {}): UserModel => {
  return {
    email: mockValues.email,
    firstName: mockValues.firstName,
    lastName: mockValues.lastName,
    id: mockValues.id,
    password: mockValues.password,
    role: UserRoles.STUDENT,
    createdAt: new Date(),
    updatedAt: new Date(),
    resetPasswordSecret: mockValues.password,
    ...user,
  };
};
