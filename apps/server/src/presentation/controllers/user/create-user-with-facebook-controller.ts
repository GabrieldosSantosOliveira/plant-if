import { CreateUserWithFacebookUseCase } from "../../../domain/use-cases/user/create-user-with-facebook-use-case";
import { CreateUserWithFacebookBodyDto } from "../../dtos/user/create-user-with-facebook-body.dto";
import { ResponseEntity } from "../../helpers/http/response-entity";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest } from "../../protocols/http/http-request";
import { HttpResponse } from "../../protocols/http/http-response";
import { UserViewModel } from "../../view-models/user-view-model";
export interface CreateUserWithFacebookControllerRequest {
  accessToken: string;
}
export class CreateUserWithFacebookController implements Controller {
  constructor(
    private readonly createUserWithFacebookUseCase: CreateUserWithFacebookUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      CreateUserWithFacebookControllerRequest,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    const createUserWithFacebookBodyDto =
      CreateUserWithFacebookBodyDto.safeParse({
        accessToken: httpRequest.body.accessToken,
      });
    if (!createUserWithFacebookBodyDto.success) {
      return ResponseEntity.badRequest(createUserWithFacebookBodyDto.error);
    }

    const user = await this.createUserWithFacebookUseCase.handle({
      accessToken: createUserWithFacebookBodyDto.data.accessToken,
    });

    return ResponseEntity.ok({
      user: UserViewModel.toHTTP(user.user),
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  }
}
