import { CreateUserWithGoogleController } from "@/presentation/controllers/user/create-user-with-google-controller";

import { makeCreateUserWithGoogleUseCase } from "../../data/use-cases/make-create-user-with-google-use-case";

export const makeCreateUserWithGoogleController = () => {
  return new CreateUserWithGoogleController(makeCreateUserWithGoogleUseCase());
};
