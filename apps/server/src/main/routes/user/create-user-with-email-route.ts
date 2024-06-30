import { Router } from "express";
import { makeExpressRouterAdapter } from "../../adapters/express-router-adapter";
import { makeGlobalHandlerException } from "../../factories/global-handler-exception/make-global-handler-exception";
import { makeCreateUserWithEmailController } from "../../factories/presentation/controllers/make-create-user-with-email-controller";
export default function CreateUserWithEmailRoute(router: Router) {
  router.post(
    "/user/auth/sing-up/email",
    makeExpressRouterAdapter(
      makeGlobalHandlerException(makeCreateUserWithEmailController()),
    ),
  );
}
