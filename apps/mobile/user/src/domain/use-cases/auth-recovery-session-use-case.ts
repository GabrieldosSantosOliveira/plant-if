export interface AuthRecoverySessionUseCaseResponse {
  accessToken: string
  refreshToken: string
}
export interface AuthRecoverySessionUseCase {
  execute(): Promise<AuthRecoverySessionUseCaseResponse | null>
}
