import { AuthenticateUserWithEmailUseCase } from '@/domain/use-cases/user/authenticate-user-with-email-use-case'
import { AuthenticateUserWithEmailControllerBodyDto } from '@/presentation/dtos/user/authenticate-user-with-email-body.dto'
import { ResponseEntity } from '@/presentation/helpers/http/response-entity'
import { Controller } from '@/presentation/protocols/controller/controller'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import { HttpResponse } from '@/presentation/protocols/http/http-response'
import { UserViewModel } from '@/presentation/view-models/user-view-model'
export interface AuthenticateUserWithEmailUseCaseRequestBody {
  email: string
  password: string
}
export class AuthenticateUserWithEmailController implements Controller {
  constructor(
    private readonly authenticateUserWithEmailUseCase: AuthenticateUserWithEmailUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      AuthenticateUserWithEmailUseCaseRequestBody,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    try {
      const authenticateUserWithEmailControllerBodyDto =
        AuthenticateUserWithEmailControllerBodyDto.safeParse(httpRequest.body)
      if (!authenticateUserWithEmailControllerBodyDto.success) {
        return ResponseEntity.badRequest(
          authenticateUserWithEmailControllerBodyDto.error,
        )
      }
      const userOrException =
        await this.authenticateUserWithEmailUseCase.handle(
          authenticateUserWithEmailControllerBodyDto.data,
        )
      if (userOrException.isLeft()) {
        return ResponseEntity.exception(userOrException.value)
      }

      return ResponseEntity.ok({
        accessToken: userOrException.value.accessToken,
        refreshToken: userOrException.value.refreshToken,
        user: UserViewModel.toHTTP(userOrException.value.user),
      })
    } catch {
      return ResponseEntity.serverError()
    }
  }
}
