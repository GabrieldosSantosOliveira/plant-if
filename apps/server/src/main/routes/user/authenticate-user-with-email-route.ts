import { Router } from "express";
import { makeExpressRouterAdapter } from "../../adapters/express-router-adapter";
import { makeGlobalHandlerException } from "../../factories/global-handler-exception/make-global-handler-exception";
import { makeAuthenticateUserWithEmailController } from "../../factories/presentation/controllers/make-authenticate-user-with-email-controller";

export default function AuthenticateUserWithEmailRoute(router: Router) {
  router.post(
    "/user/auth/sing-in/email",
    makeExpressRouterAdapter(
      makeGlobalHandlerException(makeAuthenticateUserWithEmailController()),
    ),
  );
}
