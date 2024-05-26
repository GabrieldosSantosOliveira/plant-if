import { AuthServiceImpl } from "@/infra/auth/auth-service-impl";
import { env } from "@/main/config/env";

import { makeJwt } from "./make-jwt";
const TEN_MINUTES = 60 * 10;
const ONE_WEEK = 60 * 60 * 24 * 7;
export const makeAuthService = () => {
  return new AuthServiceImpl(makeJwt(), {
    EXPIRE_REFRESH_TOKEN: TEN_MINUTES,
    EXPIRE_ACCESS_TOKEN: ONE_WEEK,
    SECRET_ACCESS_TOKEN: env.SECRET_ACCESS_TOKEN,
    SECRET_REFRESH_TOKEN: env.SECRET_REFRESH_TOKEN,
  });
};
