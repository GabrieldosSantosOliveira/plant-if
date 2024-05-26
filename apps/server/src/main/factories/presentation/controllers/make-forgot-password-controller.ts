import { ForgotPasswordController } from "@/presentation/controllers/user/forgot-password-controller";

import { makeForgotPasswordUseCase } from "../../data/use-cases/make-forgot-password-use-case";

export const makeForgotPasswordController = () =>
  new ForgotPasswordController(makeForgotPasswordUseCase());
