import { Either } from '@/shared/either';

import { Exception } from '../use-cases/errors/exception';
export interface ForgotPasswordRepositoryDto {
  email: string;
}
export interface ForgotPasswordRepository {
  execute(data: ForgotPasswordRepositoryDto): Promise<Either<Exception, null>>;
}
