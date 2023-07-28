import { makeExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { makeAuthenticateUserWithEmailController } from '@/main/factories/presentation/controllers/make-authenticate-user-with-email-controller'
import { Router } from 'express'

export default function AuthenticateUserWithEmailRoute(router: Router) {
  router.post(
    '/user/auth/sing-in/email',
    makeExpressRouterAdapter(makeAuthenticateUserWithEmailController()),
  )
}
