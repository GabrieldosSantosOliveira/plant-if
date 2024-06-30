export interface ResetPasswordUseCase {
  handle(
    data: ResetPasswordUseCase.Params,
  ): Promise<ResetPasswordUseCase.Response>;
}
export declare module ResetPasswordUseCase {
  export interface Params {
    email: string;
    code: string;
    resetPassword: string;
  }
  export type Response = void;
}
