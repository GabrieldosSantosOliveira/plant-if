import { User as RawUser } from "@prisma/client";
import { UserModel, UserRoles } from "../../../../domain/entities/user";
export class PrismaUserMapper {
  static toDomain(rawUser: RawUser): UserModel {
    return {
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      createdAt: rawUser.createdAt,
      id: rawUser.id,
      updatedAt: rawUser.updatedAt,
      password: rawUser.password || undefined,
      resetPasswordSecret: rawUser.resetPasswordSecret || undefined,
      role:
        rawUser.role === UserRoles.TECHNICIAN
          ? UserRoles.TECHNICIAN
          : UserRoles.STUDENT,
    };
  }

  static toPrismaWithoutId(user: Omit<UserModel, "id">): Omit<RawUser, "id"> {
    return {
      createdAt: user.createdAt,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      updatedAt: user.updatedAt,
      password: user.password || null,
      resetPasswordSecret: user.resetPasswordSecret || null,
      role: user.role,
    };
  }
  static toPrisma(user: UserModel): RawUser {
    return {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      updatedAt: user.updatedAt,
      password: user.password || null,
      resetPasswordSecret: user.resetPasswordSecret || null,
      role: user.role,
    };
  }
  static toRole(role: string): UserRoles {
    if (role === UserRoles.STUDENT) {
      return UserRoles.STUDENT;
    } else if (role === UserRoles.TECHNICIAN) {
      return UserRoles.TECHNICIAN;
    }
    return UserRoles.STUDENT;
  }
}
