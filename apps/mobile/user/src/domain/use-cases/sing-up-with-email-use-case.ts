import { Either } from '@/shared/either';

import { UserUiModel } from '../ui-model/user-ui-model';
import { Exception } from './errors/exception';
export interface SingUpWithEmailUseCaseDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface SingUpWithEmailUseCase {
  execute(
    data: SingUpWithEmailUseCaseDto,
  ): Promise<Either<Exception, UserUiModel>>;
}
