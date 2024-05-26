import { Either } from '@/shared/either';

import { Exception } from './errors/exception';
export interface ResetPasswordUseCaseDto {
  email: string;
  code: string;
  resetPassword: string;
}
export interface ResetPasswordUseCase {
  execute(data: ResetPasswordUseCaseDto): Promise<Either<Exception, null>>;
}
