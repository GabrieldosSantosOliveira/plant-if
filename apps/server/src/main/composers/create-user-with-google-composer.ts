import { CreateUserWithGoogleUseCaseImpl } from '@/app/use-cases/user/create-user-with-google-use-case-impl'
import { PrismaCreateUserRepository } from '@/infra/database/prisma/repositories/prisma-create-user-repository'
import { PrismaLoadUserByEmailRepository } from '@/infra/database/prisma/repositories/prisma-load-user-by-email-repository'
import { HttpServiceImpl } from '@/infra/http/http-service-impl'
import { LoadGoogleUserImpl } from '@/infra/implementations/google/load-google-user-impl'
import { CreateUserWithGoogleController } from '@/presentation/controllers/user/create-user-with-google-controller'

import { authServiceImpl } from '../lib/auth-service'
import { prismaService } from '../lib/prisma-service'

export class CreateUserWithGoogleComposer {
  static route() {
    const prismaCreateUserRepository = new PrismaCreateUserRepository(
      prismaService,
    )
    const prismaLoadUserByEmailRepository = new PrismaLoadUserByEmailRepository(
      prismaService,
    )
    const httpServiceImpl = new HttpServiceImpl()
    const loadGoogleUserImpl = new LoadGoogleUserImpl(httpServiceImpl)

    const createUserWithGoogleUseCaseImpl = new CreateUserWithGoogleUseCaseImpl(
      loadGoogleUserImpl,
      prismaLoadUserByEmailRepository,
      authServiceImpl,
      prismaCreateUserRepository,
    )
    const createUserWithGoogleController = new CreateUserWithGoogleController(
      createUserWithGoogleUseCaseImpl,
    )
    return createUserWithGoogleController
  }
}
