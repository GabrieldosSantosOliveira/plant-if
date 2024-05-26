import { AuthenticateUserWithEmailUseCaseImpl } from "@/data/use-cases/user/authenticate-user-with-email-use-case-impl";

import { makeAuthService } from "../../infra/auth/make-auth-service";
import { makeHashComparer } from "../../infra/cryptography/make-hash-comparer";
import { makeLoadUserByEmailRepository } from "../../infra/database/repositories/make-load-user-by-email-repository";

export const makeAuthenticateUserWithEmailUseCase = () =>
  new AuthenticateUserWithEmailUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeHashComparer(),
    makeAuthService(),
  );
