import { LoadFacebookUserImpl } from '@/infra/gateways/facebook/load-facebook-user-impl'
import { env } from '@/main/config/env'

import { makeHttpClient } from '../../http/make-http-client'

export const makeLoadFacebookUser = () => {
  return new LoadFacebookUserImpl(
    makeHttpClient(),
    env.FACEBOOK_APP_SECRET,
    env.FACEBOOK_APP_ID,
  )
}
