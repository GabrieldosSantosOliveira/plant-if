import { AuthWithFacebookUseCaseImpl } from '@/data/use-cases/auth/auth-with-facebook-use-case-impl';
import { MakeAuthWithFacebookRepository } from '@/main/factories/infra/data-source/repositories/auth/make-auth-with-facebook-repository';
import { MakeSecureStorage } from '@/main/factories/infra/storage/make-secure-storage';

export const MakeAuthWithFacebookUseCase = () =>
  new AuthWithFacebookUseCaseImpl(
    MakeAuthWithFacebookRepository(),
    MakeSecureStorage(),
  );
