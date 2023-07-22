import { CreateUserWithAppleUseCase } from '@/domain/use-cases/user/create-user-with-apple-use-case'
import { ResponseEntity } from '@/presentation/helpers/http/response-entity'
import { Controller } from '@/presentation/protocols/controller/controller'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import { HttpResponse } from '@/presentation/protocols/http/http-response'
import { UserViewModel } from '@/presentation/view-models/user-view-model'

import { CreateUserWithAppleBodyDto } from '../../dtos/user/create-user-with-apple-body.dto'
export interface CreateUserWithAppleControllerRequest {
  code: string
  email: string
  firstName: string
  lastName: string
}
export class CreateUserWithAppleController implements Controller {
  constructor(
    private readonly createUserWithAppleUseCase: CreateUserWithAppleUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      CreateUserWithAppleControllerRequest,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    try {
      const createUserWithAppleBodyDto = CreateUserWithAppleBodyDto.safeParse(
        httpRequest.body,
      )
      if (!createUserWithAppleBodyDto.success) {
        return ResponseEntity.badRequest(createUserWithAppleBodyDto.error)
      }

      const userOrException = await this.createUserWithAppleUseCase.handle({
        code: createUserWithAppleBodyDto.data.code,
        email: createUserWithAppleBodyDto.data.email,
        firstName: createUserWithAppleBodyDto.data.firstName,
        lastName: createUserWithAppleBodyDto.data.lastName,
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
