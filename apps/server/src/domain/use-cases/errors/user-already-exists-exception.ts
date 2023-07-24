import { HttpStatusCode } from '@/presentation/helpers/http/http-status-code'

import { HttpException } from './http-exception'

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super({
      message: 'User already exists',
      statusCode: HttpStatusCode.CONFLICT,
    })
    this.name = 'UserAlreadyExistsException'
  }
}
