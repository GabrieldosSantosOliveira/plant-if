import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { ResetPasswordUseCase } from "../../../../src/domain/use-cases/user/reset-password-use-case";

export class ResetPasswordUseCaseMock implements ResetPasswordUseCase {
  async handle(): Promise<ResetPasswordUseCase.Response> {}
}
export const makeResetPasswordUseCaseMock = () => {
  const resetPasswordUseCaseMock = new ResetPasswordUseCaseMock();
  return { resetPasswordUseCaseMock };
};
export class ResetPasswordUseCaseMockWithError implements ResetPasswordUseCase {
  async handle(): Promise<ResetPasswordUseCase.Response> {
    throw new Error();
  }
}
export const makeResetPasswordUseCaseMockWithError = () => {
  const resetPasswordUseCaseMockWithError =
    new ResetPasswordUseCaseMockWithError();
  return { resetPasswordUseCaseMockWithError };
};
export class ResetPasswordUseCaseMockWithException
  implements ResetPasswordUseCase
{
  async handle(): Promise<ResetPasswordUseCase.Response> {
    throw new UserNotFoundException();
  }
}
export const makeResetPasswordUseCaseMockWithException = () => {
  const resetPasswordUseCaseMockWithException =
    new ResetPasswordUseCaseMockWithException();
  return { resetPasswordUseCaseMockWithException };
};
