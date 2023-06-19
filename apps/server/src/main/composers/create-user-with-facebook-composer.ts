import { CreateUserWithFacebookUseCaseImpl } from '@/app/use-cases/user/create-user-with-facebook-use-case-impl'
import { PrismaCreateUserRepository } from '@/infra/database/prisma/repositories/prisma-create-user-repository'
import { PrismaLoadUserByEmailRepository } from '@/infra/database/prisma/repositories/prisma-load-user-by-email-repository'
import { HttpServiceImpl } from '@/infra/http/http-service-impl'
import { LoadFacebookUserImpl } from '@/infra/implementations/facebook/load-facebook-user-impl'
import { CreateUserWithFacebookController } from '@/presentation/controllers/user/create-user-with-facebook-controller'

import { env } from '../config/env'
import { authServiceImpl } from '../lib/auth-service'
import { prismaService } from '../lib/prisma-service'

export class CreateUserWithFacebookComposer {
  static route() {
    const prismaCreateUserRepository = new PrismaCreateUserRepository(
      prismaService,
    )
    const prismaLoadUserByEmailRepository = new PrismaLoadUserByEmailRepository(
      prismaService,
    )
    const httpServiceImpl = new HttpServiceImpl()
    const loadGoogleUserImpl = new LoadFacebookUserImpl(
      httpServiceImpl,
      env.FACEBOOK_APP_SECRET,
      env.FACEBOOK_APP_ID,
    )

    const createUserWithGoogleUseCaseImpl =
      new CreateUserWithFacebookUseCaseImpl(
        loadGoogleUserImpl,
        prismaLoadUserByEmailRepository,
        authServiceImpl,
        prismaCreateUserRepository,
      )
    const createUserWithGoogleController = new CreateUserWithFacebookController(
      createUserWithGoogleUseCaseImpl,
    )
    return createUserWithGoogleController
  }
}
