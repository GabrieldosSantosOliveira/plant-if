import { UpdateUserRepository } from "../../../../domain/contracts/repositories/user/update-user-repository";
import { PrismaService } from "../prisma-service";
export class PrismaUpdateUserRepository implements UpdateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(user: UpdateUserRepository.Params): Promise<void> {
    await this.prismaService.user.update({
      data: {
        updatedAt: new Date(),
        createdAt: new Date(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        resetPasswordSecret: user.resetPasswordSecret,
        role: user.role,
      },
      where: { email: user.email },
    });
  }
}
