import {
  Jwt,
  OptionsDecrypt,
  OptionsEncrypt,
  Payload,
} from '@/data/protocols/auth/jwt'
import { Either, left, right } from '@/shared/either'
import jwt from 'jsonwebtoken'

export class JwtImpl implements Jwt {
  async encrypt(payload: Payload, options: OptionsEncrypt): Promise<string> {
    const token = jwt.sign(payload, options.secret, {
      expiresIn: options.expire,
    })
    return token
  }

  async decrypt(
    encryptText: string,
    options: OptionsDecrypt,
  ): Promise<Either<Error, Payload>> {
    try {
      const payload = jwt.verify(encryptText, options.secret) as Payload
      return right(payload)
    } catch {
      return left(new Error('Invalid token'))
    }
  }
}
