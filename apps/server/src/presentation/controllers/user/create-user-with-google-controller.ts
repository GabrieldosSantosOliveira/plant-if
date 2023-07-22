import { CreateUserWithGoogleUseCase } from '@/domain/use-cases/user/create-user-with-google-use-case'
import { ResponseEntity } from '@/presentation/helpers/http/response-entity'
import { Controller } from '@/presentation/protocols/controller/controller'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import { HttpResponse } from '@/presentation/protocols/http/http-response'
import { UserViewModel } from '@/presentation/view-models/user-view-model'

import { CreateUserWithGoogleBodyDto } from '../../dtos/user/create-user-with-google-body.dto'
export interface CreateUserWithGoogleControllerRequest {
  accessToken: string
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
    try {
      const createUserWithGoogleBodyDto = CreateUserWithGoogleBodyDto.safeParse(
        {
          accessToken: httpRequest.body.accessToken,
        },
      )
      if (!createUserWithGoogleBodyDto.success) {
        return ResponseEntity.badRequest(createUserWithGoogleBodyDto.error)
      }
      const userOrException = await this.createUserWithGoogleUseCase.handle({
        accessToken: createUserWithGoogleBodyDto.data.accessToken,
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
