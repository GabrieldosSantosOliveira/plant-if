import { User } from "@/domain/entities/user";
import { Either } from "@/shared/either";

import { Exception } from "../errors/exception";
export interface CreateUserWithEmailUseCaseRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export interface CreateUserWithEmailUseCaseResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
export interface CreateUserWithEmailUseCase {
  handle(
    request: CreateUserWithEmailUseCaseRequest,
  ): Promise<Either<Exception, CreateUserWithEmailUseCaseResponse>>;
}
