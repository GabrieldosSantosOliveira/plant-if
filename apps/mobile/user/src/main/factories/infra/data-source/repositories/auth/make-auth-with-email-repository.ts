import { makeApiUrl } from '@/constants/make-api-url'
import { AuthWithEmailRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-email-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeAuthWithEmailRepository = () =>
  new AuthWithEmailRepositoryImpl(
    makeApiUrl('/api/user/auth/sing-in/email'),
    MakeHttpClient(),
  )
