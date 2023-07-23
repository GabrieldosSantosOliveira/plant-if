import { AuthWithFacebookRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-facebook-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeAuthWithFacebookRepository = () =>
  new AuthWithFacebookRepositoryImpl(MakeHttpClient())
