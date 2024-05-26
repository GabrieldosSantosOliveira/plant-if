import { makeExpressRouterAdapter } from "@/main/adapters/express-router-adapter";
import { makeResetPasswordController } from "@/main/factories/presentation/controllers/make-reset-password-controller";
import { Router } from "express";

export default function ResetPasswordRoute(router: Router) {
  router.post(
    "/user/auth/reset-password",
    makeExpressRouterAdapter(makeResetPasswordController()),
  );
}
