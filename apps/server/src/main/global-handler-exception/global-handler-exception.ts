import { ExceptionHandler } from "../../presentation/exception-handler/exception-handler";
import { ServerError } from "../../presentation/helpers/errors/server-error";
import { HttpStatusCode } from "../../presentation/helpers/http/http-status-code";
import { Controller } from "../../presentation/protocols/controller/controller";
import { HttpRequest } from "../../presentation/protocols/http/http-request";
import { HttpResponse } from "../../presentation/protocols/http/http-response";

export class GlobalHandlerException implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly exceptionHandlers: ExceptionHandler[],
  ) {}
  async handle(
    httpRequest: HttpRequest<unknown, unknown, unknown>,
  ): Promise<HttpResponse> {
    try {
      return await this.controller.handle(httpRequest);
    } catch (error) {
      for (const exceptionHandler of this.exceptionHandlers) {
        const isException = await exceptionHandler.handle(error);
        if (isException) {
          return isException;
        }
      }

      return {
        body: {
          message: new ServerError().message,
        },

        statusCode: HttpStatusCode.SERVER_ERROR,
      };
    }
  }
}
