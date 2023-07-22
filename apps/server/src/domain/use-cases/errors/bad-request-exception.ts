import { HttpStatusCode } from '@/helpers/http/http-status-code'

import { Exception } from './exception'
import { HttpException } from './http-exception'

export class BadRequestException extends HttpException {
  constructor(exception: Partial<Exception> = {}) {
    super({
      message: 'Bad Request',
      statusCode: HttpStatusCode.BAD_REQUEST,
      ...exception,
    })
    this.name = 'BadRequestException'
  }
}
