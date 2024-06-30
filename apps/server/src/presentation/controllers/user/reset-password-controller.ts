import { ResetPasswordUseCase } from "../../../domain/use-cases/user/reset-password-use-case";
import { ResetPasswordBodyDto } from "../../dtos/user/reset-password-body.dto";
import { ResponseEntity } from "../../helpers/http/response-entity";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest } from "../../protocols/http/http-request";
import { HttpResponse } from "../../protocols/http/http-response";

export interface ResetPasswordControllerRequestBody {
  email: string;
  code: string;
  resetPassword: string;
}
export class ResetPasswordController implements Controller {
  constructor(private readonly resetPasswordUseCase: ResetPasswordUseCase) {}
  async handle(
    httpRequest: HttpRequest<
      ResetPasswordControllerRequestBody,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    const resetPasswordBodyDto = ResetPasswordBodyDto.safeParse(
      httpRequest.body,
    );
    if (!resetPasswordBodyDto.success) {
      return ResponseEntity.badRequest(resetPasswordBodyDto.error);
    }
    await this.resetPasswordUseCase.handle(resetPasswordBodyDto.data);

    return ResponseEntity.notContent();
  }
}
