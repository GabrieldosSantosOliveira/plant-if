import { Router } from "express";
import { makeExpressRouterAdapter } from "../../adapters/express-router-adapter";
import { makeGlobalHandlerException } from "../../factories/global-handler-exception/make-global-handler-exception";
import { makeCreateUserWithFacebookController } from "../../factories/presentation/controllers/make-create-user-with-facebook-controller";

export default function CreateUserWithFacebookRoute(router: Router) {
  router.post(
    "/user/auth/facebook",
    makeExpressRouterAdapter(
      makeGlobalHandlerException(makeCreateUserWithFacebookController()),
    ),
  );
}
