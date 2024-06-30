import { CreateUserWithGoogleUseCase } from "../../../domain/use-cases/user/create-user-with-google-use-case";
import { CreateUserWithGoogleBodyDto } from "../../dtos/user/create-user-with-google-body.dto";
import { ResponseEntity } from "../../helpers/http/response-entity";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest } from "../../protocols/http/http-request";
import { HttpResponse } from "../../protocols/http/http-response";
import { UserViewModel } from "../../view-models/user-view-model";
export interface CreateUserWithGoogleControllerRequest {
  accessToken: string;
}
export class CreateUserWithGoogleController implements Controller {
  constructor(
    private readonly createUserWithGoogleUseCase: CreateUserWithGoogleUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      CreateUserWithGoogleControllerRequest,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    const createUserWithGoogleBodyDto = CreateUserWithGoogleBodyDto.safeParse({
      accessToken: httpRequest.body.accessToken,
    });
    if (!createUserWithGoogleBodyDto.success) {
      return ResponseEntity.badRequest(createUserWithGoogleBodyDto.error);
    }
    const user = await this.createUserWithGoogleUseCase.handle({
      accessToken: createUserWithGoogleBodyDto.data.accessToken,
    });

    return ResponseEntity.ok({
      user: UserViewModel.toHTTP(user.user),
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  }
}
