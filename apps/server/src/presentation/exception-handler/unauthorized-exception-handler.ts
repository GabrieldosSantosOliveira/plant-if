import { HttpResponse } from "../protocols/http/http-response";
import { ExceptionHandler } from "./exception-handler";
import { HttpStatusCode } from "../helpers/http/http-status-code";
import { UnauthorizedException } from "../../domain/use-cases/errors/unauthorized-exception";

export class UnauthorizedExceptionHandler implements ExceptionHandler {
  async handle(error: unknown): Promise<HttpResponse | null> {
    if (!(error instanceof UnauthorizedException)) {
      return null;
    }
    return {
      statusCode: HttpStatusCode.UNAUTHORIZED_ERROR,
      body: { message: "Unauthorized" },
    };
  }
}
