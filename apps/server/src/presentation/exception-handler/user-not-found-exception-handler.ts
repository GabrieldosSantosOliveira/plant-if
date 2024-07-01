import { HttpResponse } from "../protocols/http/http-response";
import { ExceptionHandler } from "./exception-handler";
import { HttpStatusCode } from "../helpers/http/http-status-code";
import { UserNotFoundException } from "../../domain/use-cases/errors/user-not-found-exception";

export class UserNotFoundExceptionHandler implements ExceptionHandler {
  async handle(error: unknown): Promise<HttpResponse | null> {
    if (!(error instanceof UserNotFoundException)) {
      return null;
    }
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
      body: { message: "User not found" },
    };
  }
}
