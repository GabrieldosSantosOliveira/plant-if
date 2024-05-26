import { UserUiModel } from '@/domain/ui-model/user-ui-model';
import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case';
import { Exception } from '@/domain/use-cases/errors/exception';
import { Either, right } from '@/shared/either';
import { makeUserUiModel } from '@/test/domain/factories/make-user-ui-model';

export class AuthWithFacebookUseCaseMock implements AuthWithFacebookUseCase {
  async execute(): Promise<Either<Exception, UserUiModel>> {
    return right(makeUserUiModel());
  }
}
export const makeAuthWithFacebookUseCaseMock = () => {
  const authWithFacebookUseCaseMock = new AuthWithFacebookUseCaseMock();
  return { authWithFacebookUseCaseMock };
};
