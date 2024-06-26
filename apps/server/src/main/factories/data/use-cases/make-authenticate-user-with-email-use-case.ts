import { AuthenticateUserWithEmailUseCaseImpl } from "@/data/use-cases/user/authenticate-user-with-email-use-case-impl";

import { makeAuthService } from "../../infra/auth/make-auth-service";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeBcrypt } from "../../infra/cryptography/make-bcrypt";

export const makeAuthenticateUserWithEmailUseCase = () =>
  new AuthenticateUserWithEmailUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeBcrypt(),
    makeAuthService(),
  );
