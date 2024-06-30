import { AuthFacadeImpl } from "../../../../infra/auth/auth-facade-impl";
import { env } from "../../../config/env";
import { makeJsonWebToken } from "./make-json-web-token";
const TEN_MINUTES = 60 * 10;
const ONE_WEEK = 60 * 60 * 24 * 7;
export const makeAuthFacade = () => {
  return new AuthFacadeImpl(makeJsonWebToken(), {
    EXPIRE_REFRESH_TOKEN: TEN_MINUTES,
    EXPIRE_ACCESS_TOKEN: ONE_WEEK,
    SECRET_ACCESS_TOKEN: env.SECRET_ACCESS_TOKEN,
    SECRET_REFRESH_TOKEN: env.SECRET_REFRESH_TOKEN,
  });
};
