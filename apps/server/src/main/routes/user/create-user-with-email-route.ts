import { makeExpressRouterAdapter } from "@/main/adapters/express-router-adapter";
import { makeCreateUserWithEmailController } from "@/main/factories/presentation/controllers/make-create-user-with-email-controller";
import { Router } from "express";

export default function CreateUserWithEmailRoute(router: Router) {
  router.post(
    "/user/auth/sing-up/email",
    makeExpressRouterAdapter(makeCreateUserWithEmailController()),
  );
}
