import { ForgotPasswordUseCase } from "@/domain/use-cases/user/forgot-password-use-case";
import { ForgotPasswordBodyDto } from "@/presentation/dtos/user/forgot-password-body.dto";
import { ResponseEntity } from "@/presentation/helpers/http/response-entity";
import { Controller } from "@/presentation/protocols/controller/controller";
import { HttpRequest } from "@/presentation/protocols/http/http-request";
import { HttpResponse } from "@/presentation/protocols/http/http-response";
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
    try {
      const forgotPasswordBodyDto = ForgotPasswordBodyDto.safeParse(
        httpRequest.body,
      );
      if (!forgotPasswordBodyDto.success) {
        return ResponseEntity.badRequest(forgotPasswordBodyDto.success);
      }
      const hasError = await this.forgotPasswordUseCase.handle({
        email: forgotPasswordBodyDto.data.email,
      });
      if (hasError.isLeft()) {
        return ResponseEntity.exception(hasError.value);
      }
      return ResponseEntity.notContent();
    } catch {
      return ResponseEntity.serverError();
    }
  }
}
