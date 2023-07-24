import { CreateUserWithEmailUseCaseImpl } from '@/data/use-cases/user/create-user-with-email-use-case-impl'

import { makeAuthService } from '../../infra/auth/make-auth-service'
import { makeHasher } from '../../infra/cryptography/make-hasher'
import { makeCreateUserRepository } from '../../infra/database/repositories/make-create-user-repository'
import { makeLoadUserByEmailRepository } from '../../infra/database/repositories/make-load-user-by-email-repository'
import { makeGeneratorUUID } from '../../infra/gateways/uuid/make-generator-uuid'

export const makeCreateUserWithEmailUseCase = () => {
  return new CreateUserWithEmailUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeAuthService(),
    makeCreateUserRepository(),
    makeGeneratorUUID(),
    makeHasher(),
  )
}
