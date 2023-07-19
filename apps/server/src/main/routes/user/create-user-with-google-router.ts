import { ExpressRouterAdapter } from '@/main/adapters/express-router-adapter'
import { CreateUserWithGoogleComposer } from '@/main/composers/create-user-with-google-composer'
import { Router } from 'express'

export default function CreateUserWithGoogleRouter(router: Router) {
  router.post(
    '/user/google',
    ExpressRouterAdapter.route(CreateUserWithGoogleComposer.route()),
  )
}
