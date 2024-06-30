import { makeCreateUserRepository } from "../../infra/database/repositories/make-create-user-repository";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeBcrypt } from "../../infra/cryptography/make-bcrypt";
import { makeAuthFacade } from "../../infra/auth/make-auth-facade";
import { CreateUserWithEmailUseCaseImpl } from "../../../../data/use-cases/user/create-user-with-email-use-case-impl";

export const makeCreateUserWithEmailUseCase = () => {
  return new CreateUserWithEmailUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeAuthFacade(),
    makeCreateUserRepository(),
    makeBcrypt(),
  );
};
