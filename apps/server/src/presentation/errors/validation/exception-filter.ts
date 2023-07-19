import { ResponseEntity } from '@/helpers/http/response-entity'
import { HttpResponse } from '@/interfaces/http/http-response'

import { HttpException } from '../exceptions/http-exception'

export class ExceptionFilter {
  public static handle(error: unknown): HttpResponse {
    if (error instanceof HttpException) {
      return ResponseEntity.customError(error.statusCode, {
        message: error.error.message,
      })
    }
    return ResponseEntity.serverError()
  }
}
