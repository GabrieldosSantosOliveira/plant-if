import { CreateUserWithFacebookUseCase } from '@/domain/use-cases/user/create-user-with-facebook-use-case'
import { ResponseEntity } from '@/presentation/helpers/http/response-entity'
import { Controller } from '@/presentation/protocols/controller/controller'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import { HttpResponse } from '@/presentation/protocols/http/http-response'
import { UserViewModel } from '@/presentation/view-models/user-view-model'

import { CreateUserWithFacebookBodyDto } from '../../dtos/user/create-user-with-facebook-body.dto'
export interface CreateUserWithFacebookControllerRequest {
  accessToken: string
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
    try {
      const createUserWithFacebookBodyDto =
        CreateUserWithFacebookBodyDto.safeParse({
          accessToken: httpRequest.body.accessToken,
        })
      if (!createUserWithFacebookBodyDto.success) {
        return ResponseEntity.badRequest(createUserWithFacebookBodyDto.error)
      }

      const userOrException = await this.createUserWithFacebookUseCase.handle({
        accessToken: createUserWithFacebookBodyDto.data.accessToken,
      })
      if (userOrException.isLeft()) {
        return ResponseEntity.exception(userOrException.value)
      }
      return ResponseEntity.ok({
        user: UserViewModel.toHTTP(userOrException.value.user),
        accessToken: userOrException.value.accessToken,
        refreshToken: userOrException.value.refreshToken,
      })
    } catch (error) {
      return ResponseEntity.serverError()
    }
  }
}
