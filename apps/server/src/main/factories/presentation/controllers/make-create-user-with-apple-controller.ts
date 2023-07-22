import { CreateUserWithAppleController } from '@/presentation/controllers/user/create-user-with-apple-controller'

import { makeCreateUserWithAppleUseCase } from '../../data/use-cases/make-create-user-with-apple-use-case'

export const makeCreateUserWithAppleController = () => {
  return new CreateUserWithAppleController(makeCreateUserWithAppleUseCase())
}
