export interface ForgotPasswordUseCase {
  handle(
    request: ForgotPasswordUseCase.Params,
  ): Promise<ForgotPasswordUseCase.Response>;
}
export declare module ForgotPasswordUseCase {
  export interface Params {
    email: string;
  }
  export type Response = void;
}
