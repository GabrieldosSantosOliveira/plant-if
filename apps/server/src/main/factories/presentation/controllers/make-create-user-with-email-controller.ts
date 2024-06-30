import { CreateUserWithEmailController } from "../../../../presentation/controllers/user/create-user-with-email-controller";
import { makeCreateUserWithEmailUseCase } from "../../data/use-cases/make-create-user-with-email-use-case";

export const makeCreateUserWithEmailController = () => {
  return new CreateUserWithEmailController(makeCreateUserWithEmailUseCase());
};
