import { Router } from "express";
import { makeGlobalHandlerException } from "../../factories/global-handler-exception/make-global-handler-exception";
import { makeExpressRouterAdapter } from "../../adapters/express-router-adapter";
import { makeCreateUserWithGoogleController } from "../../factories/presentation/controllers/make-create-user-with-google-controller";

export default function CreateUserWithGoogleRoute(router: Router) {
  router.post(
    "/user/auth/google",
    makeExpressRouterAdapter(
      makeGlobalHandlerException(makeCreateUserWithGoogleController()),
    ),
  );
}
