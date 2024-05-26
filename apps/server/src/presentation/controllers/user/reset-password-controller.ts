import { ResetPasswordUseCase } from "@/domain/use-cases/user/reset-password-use-case";
import { ResetPasswordBodyDto } from "@/presentation/dtos/user/reset-password-body.dto";
import { ResponseEntity } from "@/presentation/helpers/http/response-entity";
import { Controller } from "@/presentation/protocols/controller/controller";
import { HttpRequest } from "@/presentation/protocols/http/http-request";
import { HttpResponse } from "@/presentation/protocols/http/http-response";
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
    try {
      const resetPasswordBodyDto = ResetPasswordBodyDto.safeParse(
        httpRequest.body,
      );
      if (!resetPasswordBodyDto.success) {
        return ResponseEntity.badRequest(resetPasswordBodyDto.error);
      }
      const exception = await this.resetPasswordUseCase.handle(
        resetPasswordBodyDto.data,
      );
      if (exception.isLeft()) {
        return ResponseEntity.exception(exception.value);
      }
      return ResponseEntity.notContent();
    } catch {
      return ResponseEntity.serverError();
    }
  }
}
