import { Either } from '@/shared/either';

import { UserUiModel } from '../ui-model/user-ui-model';
import { Exception } from '../use-cases/errors/exception';
export interface AuthWithFacebookRepositoryResponse {
  user: UserUiModel;
  accessToken: string;
  refreshToken: string;
}
export interface AuthWithFacebookRepository {
  execute(
    accessToken: string,
  ): Promise<Either<Exception, AuthWithFacebookRepositoryResponse>>;
}
