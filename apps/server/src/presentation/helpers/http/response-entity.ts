import { HttpResponse } from "../../protocols/http/http-response";
import { ServerError } from "../errors/server-error";
import { HttpStatusCode } from "./http-status-code";

export class ResponseEntity {
  static notContent(): HttpResponse {
    return {
      statusCode: HttpStatusCode.NO_CONTENT,
      body: null,
    };
  }

  static badRequest(body: unknown): HttpResponse {
    return {
      body,
      statusCode: HttpStatusCode.BAD_REQUEST,
    };
  }

  static ok(body: unknown): HttpResponse {
    return {
      body,
      statusCode: HttpStatusCode.OK,
    };
  }

  static created(body: unknown): HttpResponse {
    return {
      body,
      statusCode: HttpStatusCode.CREATED,
    };
  }

  static serverError(): HttpResponse {
    return {
      body: {
        message: new ServerError().message,
      },
      statusCode: HttpStatusCode.SERVER_ERROR,
    };
  }
}
