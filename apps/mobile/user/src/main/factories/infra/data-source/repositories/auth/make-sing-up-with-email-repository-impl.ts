import { makeApiUrl } from '@/constants/make-api-url'
import { SingUpWithEmailRepositoryImpl } from '@/infra/data-source/repositories/auth/sing-up-with-email-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeSingUpWithEmailRepository = () =>
  new SingUpWithEmailRepositoryImpl(
    makeApiUrl('/api/user/auth/sing-up/email'),
    MakeHttpClient(),
  )
