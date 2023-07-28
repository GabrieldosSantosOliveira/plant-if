import { ForgotPasswordRepositoryImpl } from '@/infra/data-source/repositories/auth/forgot-password-repository-impl'

import { MakeHttpClient } from '../../../http/make-http-client'

export const MakeForgotPasswordRepository = () =>
  new ForgotPasswordRepositoryImpl(MakeHttpClient())
