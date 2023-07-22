import { makeExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { makeCreateUserWithFacebookController } from '@/main/factories/presentation/controllers/make-create-user-with-facebook-controller'
import { Router } from 'express'

export default function CreateUserWithFacebookRouter(router: Router) {
  router.post(
    '/user/auth/facebook',
    makeExpressRouterAdapter(makeCreateUserWithFacebookController()),
  )
}
