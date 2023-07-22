import { CreateUserWithAppleUseCaseImpl } from '@/data/use-cases/user/create-user-with-apple-use-case-impl'

import { makeAuthService } from '../../infra/auth/make-auth-service'
import { makeCreateUserRepository } from '../../infra/database/repositories/make-create-user-repository'
import { makeLoadUserByEmailRepository } from '../../infra/database/repositories/make-load-user-by-email-repository'
import { makeAuthAppleUser } from '../../infra/gateways/apple/make-auth-apple-user'
import { makeGeneratorUUID } from '../../infra/gateways/uuid/make-generator-uuid'

export const makeCreateUserWithAppleUseCase = () => {
  return new CreateUserWithAppleUseCaseImpl(
    makeAuthAppleUser(),
    makeLoadUserByEmailRepository(),
    makeAuthService(),
    makeCreateUserRepository(),
    makeGeneratorUUID(),
  )
}
