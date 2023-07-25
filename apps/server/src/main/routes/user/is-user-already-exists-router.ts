import { makeExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { makeIsUserAlreadyExistsController } from '@/main/factories/presentation/controllers/make-is-user-already-exists-controller'
import { Router } from 'express'

export default function IsUserAlreadyExistsRoute(router: Router) {
  router.post(
    '/user/exists',
    makeExpressRouterAdapter(makeIsUserAlreadyExistsController()),
  )
}
