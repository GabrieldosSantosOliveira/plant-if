import { CreateUserWithEmailUseCase } from "../../../domain/use-cases/user/create-user-with-email-use-case";
import { CreateUserWithEmailBodyDto } from "../../dtos/user/create-user-with-email-body.dto";
import { ResponseEntity } from "../../helpers/http/response-entity";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest } from "../../protocols/http/http-request";
import { HttpResponse } from "../../protocols/http/http-response";
import { UserViewModel } from "../../view-models/user-view-model";
export interface CreateUserWithEmailControllerRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export class CreateUserWithEmailController implements Controller {
  constructor(
    private readonly createUserWithEmailUseCase: CreateUserWithEmailUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      CreateUserWithEmailControllerRequest,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    const createUserWithEmailBodyDto = CreateUserWithEmailBodyDto.safeParse(
      httpRequest.body,
    );
    if (!createUserWithEmailBodyDto.success) {
      return ResponseEntity.badRequest(createUserWithEmailBodyDto.error);
    }

    const user = await this.createUserWithEmailUseCase.handle(
      createUserWithEmailBodyDto.data,
    );

    return ResponseEntity.created({
      user: UserViewModel.toHTTP(user.user),
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  }
}
