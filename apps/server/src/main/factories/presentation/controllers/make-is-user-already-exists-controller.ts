import { IsUserAlreadyExistsController } from '@/presentation/controllers/user/is-user-already-exists-controller'

import { makeIsUserAlreadyExistsUseCase } from '../../data/use-cases/make-is-user-already-exists-use-case'

export const makeIsUserAlreadyExistsController = () =>
  new IsUserAlreadyExistsController(makeIsUserAlreadyExistsUseCase())
