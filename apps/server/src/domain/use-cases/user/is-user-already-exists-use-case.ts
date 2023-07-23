export interface IsUserAlreadyExistsUseCaseRequest {
  email: string
}
export type IsUserAlreadyExistsUseCaseResponse = boolean
export interface IsUserAlreadyExistsUseCase {
  handle(
    request: IsUserAlreadyExistsUseCaseRequest,
  ): Promise<IsUserAlreadyExistsUseCaseResponse>
}
