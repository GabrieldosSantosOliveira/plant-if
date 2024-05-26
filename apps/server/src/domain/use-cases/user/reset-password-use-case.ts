import { Either } from "@/shared/either";

import { Exception } from "../errors/exception";
export interface ResetPasswordUseCaseRequest {
  email: string;
  code: string;
  resetPassword: string;
}

export interface ResetPasswordUseCase {
  handle(data: ResetPasswordUseCaseRequest): Promise<Either<Exception, null>>;
}
