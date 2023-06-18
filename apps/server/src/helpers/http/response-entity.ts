import { HttpResponse } from '@/interfaces/http/http-response'

import { HttpStatusCode } from './http-status-code'

export class ResponseEntity {
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
      body: new Error(),
      statusCode: HttpStatusCode.SERVER_ERROR,
    }
  }
}
