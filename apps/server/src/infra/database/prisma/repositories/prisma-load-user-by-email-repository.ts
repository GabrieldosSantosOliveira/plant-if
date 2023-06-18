import { User } from '@/app/entities/user'
import { LoadUserByEmailRepository } from '@/app/repositories/user/load-user-by-email-repository'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaLoadUserByEmailRepository
  implements LoadUserByEmailRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<User | null> {
    const rawUser = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (!rawUser) return null
    return PrismaUserMapper.toDomain(rawUser)
  }
}
