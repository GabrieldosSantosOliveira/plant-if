import { HttpStatusCode } from "@/presentation/helpers/http/http-status-code";

import { HttpException } from "./http-exception";

export class UserNotFoundException extends HttpException {
  constructor() {
    super({
      message: "User not found",
      statusCode: HttpStatusCode.NOT_FOUND,
    });
    this.name = "UserNotFoundException";
  }
}
