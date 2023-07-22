import { AuthAppleUserImpl } from '@/infra/gateways/apple/auth-apple-user-impl'
import { env } from '@/main/config/env'

import { makeHttpClient } from '../../http/make-http-client'

export const makeAuthAppleUser = () => {
  return new AuthAppleUserImpl(
    makeHttpClient(),
    env.APPLE_CLIENT_SECRET,
    env.APPLE_CLIENT_ID,
  )
}
