import { IsUserAlreadyExistsUseCase } from '@/domain/use-cases/user/is-user-already-exists-use-case'
import { IsUserAlreadyExistsBodyDto } from '@/presentation/dtos/user/is-user-already-exists-body.dto'
import { ResponseEntity } from '@/presentation/helpers/http/response-entity'
import { Controller } from '@/presentation/protocols/controller/controller'
import { HttpRequest } from '@/presentation/protocols/http/http-request'
import { HttpResponse } from '@/presentation/protocols/http/http-response'
export interface IsUserAlreadyExistsControllerRequestBody {
  email: string
}
export class IsUserAlreadyExistsController implements Controller {
  constructor(
    private readonly isUserAlreadyExistsUseCase: IsUserAlreadyExistsUseCase,
  ) {}

  async handle(
    httpRequest: HttpRequest<
      IsUserAlreadyExistsControllerRequestBody,
      unknown,
      unknown
    >,
  ): Promise<HttpResponse> {
    try {
      const isUserAlreadyExistsBodyDto = IsUserAlreadyExistsBodyDto.safeParse(
        httpRequest.body,
      )
      if (!isUserAlreadyExistsBodyDto.success) {
        return ResponseEntity.badRequest(isUserAlreadyExistsBodyDto.error)
      }
      const isUserExists = await this.isUserAlreadyExistsUseCase.handle({
        email: isUserAlreadyExistsBodyDto.data.email,
      })
      return ResponseEntity.ok({
        userExists: isUserExists,
      })
    } catch (error) {
      return ResponseEntity.serverError()
    }
  }
}
