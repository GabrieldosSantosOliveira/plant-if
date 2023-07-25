import { ForgotPasswordUseCaseImpl } from '@/data/use-cases/user/forgot-password-use-case-impl'

import { makeLoadUserByEmailRepository } from '../../infra/database/repositories/make-load-user-by-email-repository'
import { makeUpdateUserRepository } from '../../infra/database/repositories/make-update-user-repository'
import { makeSendMail } from '../../infra/gateways/email/make-send-mail'
import { makeGenerateRandomNumber } from '../../infra/gateways/random-number/make-generate-random-number'

export const makeForgotPasswordUseCase = () => {
  return new ForgotPasswordUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeUpdateUserRepository(),
    makeSendMail(),
    makeGenerateRandomNumber(),
  )
}
