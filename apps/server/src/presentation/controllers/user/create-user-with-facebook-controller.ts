import { ResponseEntity } from '@/helpers/http/response-entity'
import { Controller } from '@/interfaces/controller/controller'
import { HttpRequest } from '@/interfaces/http/http-request'
import { HttpResponse } from '@/interfaces/http/http-response'
import { CreateUserWithFacebookUseCase } from '@/interfaces/use-cases/user/create-user-with-facebook-use-case'
import { ExceptionFilter } from '@/presentation/errors/validation/exception-filter'
import { UserViewModel } from '@/presentation/view-models/user-view-model'
import { validate } from 'class-validator'

import { CreateUserWithFacebookBodyDto } from '../../dtos/user/create-user-with-facebook-body.dto'
export interface CreateUserWithFacebookControllerRequest {
  accessToken: string
}
export class CreateUserWithFacebookController implements Controller {
  constructor(
    private readonly createUserWithFacebookUseCase: CreateUserWithFacebookUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateUserWithFacebookControllerRequest, any, any>,
  ): Promise<HttpResponse> {
    try {
      const createUserWithFacebookBodyDto = new CreateUserWithFacebookBodyDto({
        accessToken: httpRequest.body.accessToken,
      })
      const hasErrors = await validate(createUserWithFacebookBodyDto)
      if (hasErrors.length !== 0) {
        return ResponseEntity.badRequest(hasErrors)
      }
      const { accessToken, refreshToken, user } =
        await this.createUserWithFacebookUseCase.handle({
          accessToken: createUserWithFacebookBodyDto.accessToken,
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
