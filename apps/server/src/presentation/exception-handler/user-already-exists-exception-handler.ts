import { HttpResponse } from "../protocols/http/http-response";
import { ExceptionHandler } from "./exception-handler";
import { HttpStatusCode } from "../helpers/http/http-status-code";
import { UserAlreadyExistsException } from "../../domain/use-cases/errors/user-already-exists-exception";

export class UserAlreadyExistsExceptionHandler implements ExceptionHandler {
  async handle(error: unknown): Promise<HttpResponse | null> {
    if (!(error instanceof UserAlreadyExistsException)) {
      return null;
    }
    return {
      statusCode: HttpStatusCode.CONFLICT,
      body: { message: "User already exists" },
    };
  }
}
