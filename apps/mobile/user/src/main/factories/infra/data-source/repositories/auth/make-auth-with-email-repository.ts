import { AuthWithEmailRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-email-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeAuthWithEmailRepository = () =>
  new AuthWithEmailRepositoryImpl(MakeHttpClient())
