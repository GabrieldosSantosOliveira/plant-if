import { Router } from "express";
import { makeExpressRouterAdapter } from "../../adapters/express-router-adapter";
import { makeGlobalHandlerException } from "../../factories/global-handler-exception/make-global-handler-exception";
import { makeResetPasswordController } from "../../factories/presentation/controllers/make-reset-password-controller";

export default function ResetPasswordRoute(router: Router) {
  router.post(
    "/user/auth/reset-password",
    makeExpressRouterAdapter(
      makeGlobalHandlerException(makeResetPasswordController()),
    ),
  );
}
