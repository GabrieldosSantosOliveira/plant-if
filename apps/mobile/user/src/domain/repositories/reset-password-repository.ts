import { Either } from '@/shared/either';

import { Exception } from '../use-cases/errors/exception';

export interface ResetPasswordRepositoryDto {
  email: string;
  code: string;
  resetPassword: string;
}
export interface ResetPasswordRepository {
  execute(data: ResetPasswordRepositoryDto): Promise<Either<Exception, null>>;
}
