import { HttpClientImpl } from '@/infra/http/http-client-impl'

export const makeHttpClient = () => {
  return new HttpClientImpl()
}
