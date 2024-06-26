import { ResetPasswordUseCaseImpl } from "@/data/use-cases/user/reset-password-use-case-impl";

import { makeTimeBasedOneTimePassword } from "../../infra/cryptography/make-time-based-one-time-password";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeUpdateUserRepository } from "../../infra/database/repositories/make-update-user-repository";
import { makeBcrypt } from "../../infra/cryptography/make-bcrypt";

export const makeResetPasswordUseCase = () =>
  new ResetPasswordUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeUpdateUserRepository(),
    makeBcrypt(),
    makeTimeBasedOneTimePassword(),
  );
