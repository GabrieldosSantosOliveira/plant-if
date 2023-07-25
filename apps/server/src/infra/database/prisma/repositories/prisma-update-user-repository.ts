import { UpdateUserRepository } from '@/domain/contracts/repositories/user/update-user-repository'
import { User } from '@/domain/entities/user'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaUpdateUserRepository implements UpdateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async save(user: User): Promise<void> {
    const rawUser = PrismaUserMapper.toPrisma(user)
    await this.prismaService.user.update({
      data: rawUser,
      where: { email: user.email },
    })
  }
}
