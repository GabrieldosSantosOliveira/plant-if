import { User } from "@/domain/entities/user";
import { Either } from "@/shared/either";

import { Exception } from "../errors/exception";

export interface ReadUserUseCase {
  handle(id: string): Promise<Either<Exception, User>>;
}
