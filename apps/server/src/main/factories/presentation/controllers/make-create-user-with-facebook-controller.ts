import { CreateUserWithFacebookController } from "@/presentation/controllers/user/create-user-with-facebook-controller";

import { makeCreateUserWithFacebookUseCase } from "../../data/use-cases/make-create-user-with-facebook-use-case";

export const makeCreateUserWithFacebookController = () => {
  return new CreateUserWithFacebookController(
    makeCreateUserWithFacebookUseCase(),
  );
};
