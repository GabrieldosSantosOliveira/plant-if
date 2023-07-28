import { SingUpWithEmailRepositoryImpl } from '@/infra/data-source/repositories/auth/sing-up-with-email-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeSingUpWithEmailRepository = () =>
  new SingUpWithEmailRepositoryImpl(MakeHttpClient())
