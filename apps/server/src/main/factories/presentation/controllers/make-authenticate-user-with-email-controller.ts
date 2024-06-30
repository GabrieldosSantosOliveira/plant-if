import { AuthenticateUserWithEmailController } from "../../../../presentation/controllers/user/authenticate-user-with-email-controller";
import { makeAuthenticateUserWithEmailUseCase } from "../../data/use-cases/make-authenticate-user-with-email-use-case";

export const makeAuthenticateUserWithEmailController = () =>
  new AuthenticateUserWithEmailController(
    makeAuthenticateUserWithEmailUseCase(),
  );
