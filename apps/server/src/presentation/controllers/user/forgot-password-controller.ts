import { ForgotPasswordUseCase } from "../../../domain/use-cases/user/forgot-password-use-case";
import { ForgotPasswordBodyDto } from "../../dtos/user/forgot-password-body.dto";
import { ResponseEntity } from "../../helpers/http/response-entity";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest } from "../../protocols/http/http-request";
import { HttpResponse } from "../../protocols/http/http-response";

export interface ForgotPasswordControllerRequestBody {
  email: string;
}
export class ForgotPasswordController implements Controller {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async handle(
    httpRequest: HttpRequest<
      ForgotPasswordControllerRequestBody,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    const forgotPasswordBodyDto = ForgotPasswordBodyDto.safeParse(
      httpRequest.body,
    );
    if (!forgotPasswordBodyDto.success) {
      return ResponseEntity.badRequest(forgotPasswordBodyDto.success);
    }
    await this.forgotPasswordUseCase.handle({
      email: forgotPasswordBodyDto.data.email,
    });

    return ResponseEntity.notContent();
  }
}
