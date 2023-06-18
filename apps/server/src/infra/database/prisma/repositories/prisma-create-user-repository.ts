import { User } from '@/app/entities/user'
import { CreateUserRepository } from '@/app/repositories/user/create-user-repository'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaCreateUserRepository implements CreateUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user: User): Promise<void> {
    const rawUser = PrismaUserMapper.toPrisma(user)
    await this.prismaService.user.create({ data: rawUser })
  }
}
