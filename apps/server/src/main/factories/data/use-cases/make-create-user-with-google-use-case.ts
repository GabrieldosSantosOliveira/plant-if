import { makeCreateUserRepository } from "../../infra/database/repositories/make-create-user-repository";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeLoadGoogleUser } from "../../infra/gateways/google/make-load-google-user";
import { makeAuthFacade } from "../../infra/auth/make-auth-facade";
import { CreateUserWithGoogleUseCaseImpl } from "../../../../data/use-cases/user/create-user-with-google-use-case-impl";

export const makeCreateUserWithGoogleUseCase = () => {
  return new CreateUserWithGoogleUseCaseImpl(
    makeLoadGoogleUser(),
    makeLoadUserByEmailRepository(),
    makeAuthFacade(),
    makeCreateUserRepository(),
  );
};
