import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeBcrypt } from "../../infra/cryptography/make-bcrypt";
import { makeAuthFacade } from "../../infra/auth/make-auth-facade";
import { AuthenticateUserWithEmailUseCaseImpl } from "../../../../data/use-cases/user/authenticate-user-with-email-use-case-impl";

export const makeAuthenticateUserWithEmailUseCase = () =>
  new AuthenticateUserWithEmailUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeBcrypt(),
    makeAuthFacade(),
  );
