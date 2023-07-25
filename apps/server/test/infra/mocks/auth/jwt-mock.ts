import { Jwt, Payload } from '@/data/protocols/auth/jwt'
import { Either, left, right } from '@/shared/either'

export class JwtMock implements Jwt {
  async encrypt(): Promise<string> {
    return 'any_token'
  }

  async decrypt(): Promise<Either<Error, Payload>> {
    return right<Error, Payload>({ sub: 'any_sub' })
  }
}
export const makeJwtMock = () => {
  const jwtMock = new JwtMock()
  return { jwtMock }
}
export class JwtMockError implements Jwt {
  async encrypt(): Promise<string> {
    throw new Error()
  }

  async decrypt(): Promise<Either<Error, Payload>> {
    return left<Error, Payload>(new Error())
  }
}
export const makeJwtMockError = () => {
  const jwtMockError = new JwtMockError()
  return { jwtMockError }
}
