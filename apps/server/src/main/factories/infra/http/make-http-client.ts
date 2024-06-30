import { AxiosHttpClientAdapter } from "../../../../infra/http/axios-http-client-adapter";

export const makeHttpClient = () => new AxiosHttpClientAdapter();
