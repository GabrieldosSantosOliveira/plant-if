import { CreateUserWithFacebookUseCase } from '@/domain/use-cases/user/create-user-with-facebook-use-case'
import { ResponseEntity } from '@/helpers/http/response-entity'
import { Controller } from '@/interfaces/controller/controller'
import { HttpRequest } from '@/interfaces/http/http-request'
import { HttpResponse } from '@/interfaces/http/http-response'
import { ExceptionFilter } from '@/presentation/errors/validation/exception-filter'
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
      const { accessToken, refreshToken, user } =
        await this.createUserWithFacebookUseCase.handle({
          accessToken: createUserWithFacebookBodyDto.data.accessToken,
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
