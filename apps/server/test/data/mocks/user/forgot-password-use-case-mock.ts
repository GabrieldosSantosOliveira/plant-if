import { UserNotFoundException } from "../../../../src/domain/use-cases/errors/user-not-found-exception";
import { ForgotPasswordUseCase } from "../../../../src/domain/use-cases/user/forgot-password-use-case";

export class ForgotPasswordUseCaseMock implements ForgotPasswordUseCase {
  async handle(): Promise<ForgotPasswordUseCase.Response> {}
}
export const makeForgotPasswordUseCaseMock = () => {
  const forgotPasswordUseCaseMock = new ForgotPasswordUseCaseMock();
  return { forgotPasswordUseCaseMock };
};
export class ForgotPasswordUseCaseMockWithError
  implements ForgotPasswordUseCase
{
  async handle(): Promise<ForgotPasswordUseCase.Response> {
    throw new Error();
  }
}
export const makeForgotPasswordUseCaseMockWithError = () => {
  const forgotPasswordUseCaseMockWithError =
    new ForgotPasswordUseCaseMockWithError();
  return { forgotPasswordUseCaseMockWithError };
};

export class ForgotPasswordUseCaseMockWithException
  implements ForgotPasswordUseCase
{
  async handle(): Promise<ForgotPasswordUseCase.Response> {
    throw new UserNotFoundException();
  }
}
export const makeForgotPasswordUseCaseMockWithException = () => {
  const forgotPasswordUseCaseMockWithException =
    new ForgotPasswordUseCaseMockWithException();
  return { forgotPasswordUseCaseMockWithException };
};
