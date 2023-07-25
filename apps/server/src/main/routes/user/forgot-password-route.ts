import { makeExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { makeForgotPasswordController } from '@/main/factories/presentation/controllers/make-forgot-password-controller'
import { Router } from 'express'

export default function CreateUserWithGoogleRouter(router: Router) {
  router.post(
    '/user/auth/forgot-password',
    makeExpressRouterAdapter(makeForgotPasswordController()),
  )
}
