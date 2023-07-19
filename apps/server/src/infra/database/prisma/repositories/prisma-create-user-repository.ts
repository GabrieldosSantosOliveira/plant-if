import { CreateUserRepository } from '@/domain/contracts/repositories/user/create-user-repository'
import { User } from '@/domain/entities/user'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaCreateUserRepository implements CreateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: User): Promise<void> {
    const rawUser = PrismaUserMapper.toPrisma(user)
    await this.prismaService.user.create({ data: rawUser })
  }
}
