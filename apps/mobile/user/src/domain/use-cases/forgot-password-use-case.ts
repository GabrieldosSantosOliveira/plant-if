import { Either } from '@/shared/either';

import { Exception } from './errors/exception';
export interface ForgotPasswordUseCaseDto {
  email: string;
}
export interface ForgotPasswordUseCase {
  execute(data: ForgotPasswordUseCaseDto): Promise<Either<Exception, null>>;
}
