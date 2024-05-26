import { AuthWithGoogleUseCaseImpl } from '@/data/use-cases/auth/auth-with-google-use-case-impl';
import { MakeAuthWithGoogleRepository } from '@/main/factories/infra/data-source/repositories/auth/make-auth-with-google-repository';
import { MakeSecureStorage } from '@/main/factories/infra/storage/make-secure-storage';

export const MakeAuthWithGoogleUseCase = () =>
  new AuthWithGoogleUseCaseImpl(
    MakeSecureStorage(),
    MakeAuthWithGoogleRepository(),
  );
