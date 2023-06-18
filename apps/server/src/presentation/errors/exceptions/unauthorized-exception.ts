import { HttpStatusCode } from '@/helpers/http/http-status-code'

import { UnauthorizedError } from '../errors/unauthorized-error'
import { HttpException } from './http-exception'

export class UnauthorizedException extends HttpException {
  constructor() {
    super(HttpStatusCode.UNAUTHORIZED_ERROR, new UnauthorizedError())
    super.name = 'UnauthorizedException'
  }
}
