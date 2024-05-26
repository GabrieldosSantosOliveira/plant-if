import { ResetPasswordController } from "@/presentation/controllers/user/reset-password-controller";

import { makeResetPasswordUseCase } from "../../data/use-cases/make-reset-password-use-case";

export const makeResetPasswordController = () =>
  new ResetPasswordController(makeResetPasswordUseCase());
