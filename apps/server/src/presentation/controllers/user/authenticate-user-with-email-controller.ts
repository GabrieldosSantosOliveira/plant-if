import { AuthenticateUserWithEmailUseCase } from "../../../domain/use-cases/user/authenticate-user-with-email-use-case";
import { AuthenticateUserWithEmailControllerBodyDto } from "../../dtos/user/authenticate-user-with-email-body.dto";
import { ResponseEntity } from "../../helpers/http/response-entity";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest } from "../../protocols/http/http-request";
import { HttpResponse } from "../../protocols/http/http-response";
import { UserViewModel } from "../../view-models/user-view-model";

export interface AuthenticateUserWithEmailUseCaseRequestBody {
  email: string;
  password: string;
}
export class AuthenticateUserWithEmailController implements Controller {
  constructor(
    private readonly authenticateUserWithEmailUseCase: AuthenticateUserWithEmailUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      AuthenticateUserWithEmailUseCaseRequestBody,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    const authenticateUserWithEmailControllerBodyDto =
      AuthenticateUserWithEmailControllerBodyDto.safeParse(httpRequest.body);
    if (!authenticateUserWithEmailControllerBodyDto.success) {
      return ResponseEntity.badRequest(
        authenticateUserWithEmailControllerBodyDto.error,
      );
    }
    const user = await this.authenticateUserWithEmailUseCase.handle(
      authenticateUserWithEmailControllerBodyDto.data,
    );

    return ResponseEntity.ok({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      user: UserViewModel.toHTTP(user.user),
    });
  }
}
