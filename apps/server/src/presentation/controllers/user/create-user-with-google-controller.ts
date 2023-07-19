import { ResponseEntity } from '@/helpers/http/response-entity'
import { Controller } from '@/interfaces/controller/controller'
import { HttpRequest } from '@/interfaces/http/http-request'
import { HttpResponse } from '@/interfaces/http/http-response'
import { CreateUserWithGoogleUseCase } from '@/interfaces/use-cases/user/create-user-with-google-use-case'
import { ExceptionFilter } from '@/presentation/errors/validation/exception-filter'
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
    httpRequest: HttpRequest<CreateUserWithGoogleControllerRequest, any, any>,
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
      const { accessToken, refreshToken, user } =
        await this.createUserWithGoogleUseCase.handle({
          accessToken: createUserWithGoogleBodyDto.data.accessToken,
        })
      return ResponseEntity.ok({
        user: UserViewModel.toHTTP(user),
        accessToken,
        refreshToken,
      })
    } catch (error) {
      return ExceptionFilter.handle(error)
    }
  }
}
