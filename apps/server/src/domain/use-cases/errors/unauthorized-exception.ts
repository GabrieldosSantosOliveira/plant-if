import { HttpStatusCode } from '@/helpers/http/http-status-code'

import { HttpException } from './http-exception'

export class UnauthorizedException extends HttpException {
  constructor() {
    super({
      message: 'Unauthorized',
      statusCode: HttpStatusCode.UNAUTHORIZED_ERROR,
    })
    this.name = 'UnauthorizedException'
  }
}
