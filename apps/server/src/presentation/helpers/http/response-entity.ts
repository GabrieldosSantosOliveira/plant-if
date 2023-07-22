import { Exception } from '@/domain/use-cases/errors/exception'
import { HttpResponse } from '@/presentation/protocols/http/http-response'

import { ServerError } from '../errors/server-error'
import { HttpStatusCode } from './http-status-code'

export class ResponseEntity {
  static exception(exception: Exception): HttpResponse {
    return {
      statusCode: exception.statusCode,
      body: {
        message: exception.message,
        code: exception.code,
        description: exception.description,
      },
    }
  }

  static badRequest(body: unknown): HttpResponse {
    return {
      body,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }
  }

  static ok(body: unknown): HttpResponse {
    return {
      body,
      statusCode: HttpStatusCode.OK,
    }
  }

  static serverError(): HttpResponse {
    return {
      body: {
        message: new ServerError().message,
      },
      statusCode: HttpStatusCode.SERVER_ERROR,
    }
  }
}
