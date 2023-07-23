import { AuthWithGoogleRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-google-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeAuthWithGoogleRepository = () =>
  new AuthWithGoogleRepositoryImpl(MakeHttpClient())
