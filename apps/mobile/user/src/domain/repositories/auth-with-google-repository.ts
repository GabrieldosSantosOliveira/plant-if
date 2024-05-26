import { Either } from '@/shared/either';

import { UserUiModel } from '../ui-model/user-ui-model';
import { Exception } from '../use-cases/errors/exception';
export interface AuthWithGoogleRepositoryResponse {
  user: UserUiModel;
  accessToken: string;
  refreshToken: string;
}
export interface AuthWithGoogleRepository {
  execute(
    accessToken: string,
  ): Promise<Either<Exception, AuthWithGoogleRepositoryResponse>>;
}
