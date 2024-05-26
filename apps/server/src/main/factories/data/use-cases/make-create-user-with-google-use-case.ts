import { CreateUserWithGoogleUseCaseImpl } from "@/data/use-cases/user/create-user-with-google-use-case-impl";

import { makeAuthService } from "../../infra/auth/make-auth-service";
import { makeCreateUserRepository } from "../../infra/database/repositories/make-create-user-repository";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeLoadGoogleUser } from "../../infra/gateways/google/make-load-google-user";
import { makeGeneratorUUID } from "../../infra/gateways/uuid/make-generator-uuid";

export const makeCreateUserWithGoogleUseCase = () => {
  return new CreateUserWithGoogleUseCaseImpl(
    makeLoadGoogleUser(),
    makeLoadUserByEmailRepository(),
    makeAuthService(),
    makeCreateUserRepository(),
    makeGeneratorUUID(),
  );
};
