import { LoadGoogleUserImpl } from "@/infra/gateways/google/load-google-user-impl";

import { makeHttpClient } from "../../http/make-http-client";

export const makeLoadGoogleUser = () => {
  return new LoadGoogleUserImpl(makeHttpClient());
};
