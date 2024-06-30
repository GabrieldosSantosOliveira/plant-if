import { makeCreateUserRepository } from "../../infra/database/repositories/make-create-user-repository";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeLoadFacebookUser } from "../../infra/gateways/facebook/make-load-facebook-user";
import { makeAuthFacade } from "../../infra/auth/make-auth-facade";
import { CreateUserWithFacebookUseCaseImpl } from "../../../../data/use-cases/user/create-user-with-facebook-use-case-impl";

export const makeCreateUserWithFacebookUseCase = () => {
  return new CreateUserWithFacebookUseCaseImpl(
    makeLoadFacebookUser(),
    makeLoadUserByEmailRepository(),
    makeAuthFacade(),
    makeCreateUserRepository(),
  );
};
