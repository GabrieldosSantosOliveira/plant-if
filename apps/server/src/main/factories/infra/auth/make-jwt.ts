import { JwtImpl } from '@/infra/auth/jwt-impl'

export const makeJwt = () => {
  return new JwtImpl()
}
