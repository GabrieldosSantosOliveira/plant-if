import { makeExpressRouterAdapter } from "@/main/adapters/express-router-adapter";
import { makeCreateUserWithGoogleController } from "@/main/factories/presentation/controllers/make-create-user-with-google-controller";
import { Router } from "express";

export default function CreateUserWithGoogleRoute(router: Router) {
  router.post(
    "/user/auth/google",
    makeExpressRouterAdapter(makeCreateUserWithGoogleController()),
  );
}
