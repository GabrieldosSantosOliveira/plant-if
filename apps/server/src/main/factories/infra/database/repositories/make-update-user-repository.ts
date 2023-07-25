import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaUpdateUserRepository } from '@/infra/database/prisma/repositories/prisma-update-user-repository'

export const makeUpdateUserRepository = () => {
  return new PrismaUpdateUserRepository(PrismaService.getInstance())
}
