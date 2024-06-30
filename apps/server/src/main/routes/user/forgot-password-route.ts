import { Router } from "express";
import { makeExpressRouterAdapter } from "../../adapters/express-router-adapter";
import { makeGlobalHandlerException } from "../../factories/global-handler-exception/make-global-handler-exception";
import { makeForgotPasswordController } from "../../factories/presentation/controllers/make-forgot-password-controller";

export default function ForgotPasswordRoute(router: Router) {
  router.post(
    "/user/auth/forgot-password",
    makeExpressRouterAdapter(
      makeGlobalHandlerException(makeForgotPasswordController()),
    ),
  );
}
