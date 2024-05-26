import { CreateUserWithEmailUseCase } from "@/domain/use-cases/user/create-user-with-email-use-case";
import { ResponseEntity } from "@/presentation/helpers/http/response-entity";
import { Controller } from "@/presentation/protocols/controller/controller";
import { HttpRequest } from "@/presentation/protocols/http/http-request";
import { HttpResponse } from "@/presentation/protocols/http/http-response";
import { UserViewModel } from "@/presentation/view-models/user-view-model";

import { CreateUserWithEmailBodyDto } from "../../dtos/user/create-user-with-email-body.dto";
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
    try {
      const createUserWithEmailBodyDto = CreateUserWithEmailBodyDto.safeParse(
        httpRequest.body,
      );
      if (!createUserWithEmailBodyDto.success) {
        return ResponseEntity.badRequest(createUserWithEmailBodyDto.error);
      }

      const userOrException = await this.createUserWithEmailUseCase.handle(
        createUserWithEmailBodyDto.data,
      );
      if (userOrException.isLeft()) {
        return ResponseEntity.exception(userOrException.value);
      }
      return ResponseEntity.created({
        user: UserViewModel.toHTTP(userOrException.value.user),
        accessToken: userOrException.value.accessToken,
        refreshToken: userOrException.value.refreshToken,
      });
    } catch (error) {
      return ResponseEntity.serverError();
    }
  }
}
