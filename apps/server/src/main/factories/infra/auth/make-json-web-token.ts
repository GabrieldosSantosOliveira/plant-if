import { JsonWebTokenImpl } from "../../../../infra/auth/json-web-token-impl";

export const makeJsonWebToken = () => new JsonWebTokenImpl();
