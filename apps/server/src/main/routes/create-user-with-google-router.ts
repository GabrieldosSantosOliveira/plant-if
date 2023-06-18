import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/express-router-adapter'
import { CreateUserWithGoogleComposer } from '../composers/create-user-with-google-composer'

export default function CreateUserWithGoogleRouter(router: Router) {
  router.post(
    '/user/google',
    ExpressRouterAdapter.route(CreateUserWithGoogleComposer.route()),
  )
}
