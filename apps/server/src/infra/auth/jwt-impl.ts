import {
  Jwt,
  OptionsDecrypt,
  OptionsEncrypt,
  Payload,
} from '@/interfaces/auth/jwt'
import jwt from 'jsonwebtoken'
export class JwtImpl implements Jwt {
  async decode<T = any>(token: string): Promise<T | null> {
    return jwt.decode(token) as any
  }

  async encrypt(identifier: string, options: OptionsEncrypt): Promise<string> {
    return jwt.sign({ sub: identifier }, options.secret, {
      expiresIn: options.expire,
    })
  }

  async decrypt(
    encryptText: string,
    options: OptionsDecrypt,
  ): Promise<Payload> {
    return jwt.verify(encryptText, options.secret) as Payload
  }
}