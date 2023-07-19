import { ExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { CreateUserWithFacebookComposer } from '@/main/composers/create-user-with-facebook-composer'
import { Router } from 'express'

export default function CreateUserWithFacebookRouter(router: Router) {
  router.post(
    '/user/facebook',
    ExpressRouterAdapter.route(CreateUserWithFacebookComposer.route()),
  )
}
