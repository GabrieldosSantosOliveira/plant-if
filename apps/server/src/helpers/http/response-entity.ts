import { HttpResponse } from '@/interfaces/http/http-response'

import { ServerError } from '../errors/server-error'
import { HttpStatusCode } from './http-status-code'

export class ResponseEntity {
  static customError(statusCode:  HttpStatusCode, body: any): HttpResponse {
    return {
      statusCode,
      body,
    }
  }

  static badRequest(body: any): HttpResponse {
    return {
      body,
      statusCode: HttpStatusCode.BAD_REQUEST,
    }
  }

  static ok(body: any): HttpResponse {
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
