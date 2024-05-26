import { CreateUserWithFacebookUseCaseImpl } from "@/data/use-cases/user/create-user-with-facebook-use-case-impl";

import { makeAuthService } from "../../infra/auth/make-auth-service";
import { makeCreateUserRepository } from "../../infra/database/repositories/make-create-user-repository";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeLoadFacebookUser } from "../../infra/gateways/facebook/make-load-facebook-user";
import { makeGeneratorUUID } from "../../infra/gateways/uuid/make-generator-uuid";

export const makeCreateUserWithFacebookUseCase = () => {
  return new CreateUserWithFacebookUseCaseImpl(
    makeLoadFacebookUser(),
    makeLoadUserByEmailRepository(),
    makeAuthService(),
    makeCreateUserRepository(),
    makeGeneratorUUID(),
  );
};
