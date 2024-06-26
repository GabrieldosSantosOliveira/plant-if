import { CreateUserWithEmailUseCaseImpl } from "@/data/use-cases/user/create-user-with-email-use-case-impl";

import { makeAuthService } from "../../infra/auth/make-auth-service";
import { makeCreateUserRepository } from "../../infra/database/repositories/make-create-user-repository";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";
import { makeGeneratorUUID } from "../../infra/gateways/uuid/make-generator-uuid";
import { makeBcrypt } from "../../infra/cryptography/make-bcrypt";

export const makeCreateUserWithEmailUseCase = () => {
  return new CreateUserWithEmailUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeAuthService(),
    makeCreateUserRepository(),
    makeGeneratorUUID(),
    makeBcrypt(),
  );
};
