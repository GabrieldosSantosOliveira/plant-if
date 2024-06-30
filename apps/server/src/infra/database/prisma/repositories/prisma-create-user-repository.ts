import { PrismaService } from "../prisma-service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { CreateUserRepository } from "../../../../domain/contracts/repositories/user/create-user-repository";
import { UserRoles } from "../../../../domain/entities/user";

export class PrismaCreateUserRepository implements CreateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    user: CreateUserRepository.Params,
  ): Promise<CreateUserRepository.Response> {
    const rawUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        role: UserRoles.STUDENT,
      },
    });

    return {
      createdAt: rawUser.createdAt,
      email: rawUser.email,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      id: rawUser.id,
      role: PrismaUserMapper.toRole(rawUser.role),
      updatedAt: rawUser.updatedAt,
      password: rawUser.password || undefined,
      resetPasswordSecret: rawUser.resetPasswordSecret || undefined,
    };
  }
}
