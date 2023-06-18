import { AuthServiceImpl } from '@/infra/auth/auth-service-impl'
import { JwtImpl } from '@/infra/auth/jwt-impl'

import { env } from '../config/env'
const TEN_MINUTES = 60 * 10
const ONE_WEEK = 60 * 60 * 24 * 7
const jwtImpl = new JwtImpl()
export const authServiceImpl = new AuthServiceImpl(jwtImpl, {
  EXPIRE_REFRESH_TOKEN: TEN_MINUTES,
  EXPIRE_ACCESS_TOKEN: ONE_WEEK,
  SECRET_ACCESS_TOKEN: env.SECRET_ACCESS_TOKEN,
  SECRET_REFRESH_TOKEN: env.SECRET_REFRESH_TOKEN,
})
