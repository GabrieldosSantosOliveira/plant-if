import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/express-router-adapter'
import { CreateUserWithFacebookComposer } from '../composers/create-user-with-facebook-composer'

export default function CreateUserWithFacebookRouter(router: Router) {
  router.post(
    '/user/facebook',
    ExpressRouterAdapter.route(CreateUserWithFacebookComposer.route()),
  )
}
