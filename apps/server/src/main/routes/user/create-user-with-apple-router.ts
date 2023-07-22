import { makeExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { makeCreateUserWithAppleController } from '@/main/factories/presentation/controllers/make-create-user-with-apple-controller'
import { Router } from 'express'

export default function CreateUserWithAppleRouter(router: Router) {
  router.post(
    '/user/auth/apple',
    makeExpressRouterAdapter(makeCreateUserWithAppleController()),
  )
}
