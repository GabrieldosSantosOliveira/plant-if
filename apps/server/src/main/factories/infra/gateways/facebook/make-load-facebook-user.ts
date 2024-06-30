import { LoadFacebookUserImpl } from "../../../../../infra/gateways/facebook/load-facebook-user-impl";
import { makeHttpClient } from "../../http/make-http-client";

export const makeLoadFacebookUser = () => {
  return new LoadFacebookUserImpl(makeHttpClient());
};
