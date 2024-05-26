import { makeApiUrl } from '@/constants/make-api-url';
import { ResetPasswordRepositoryImpl } from '@/infra/data-source/repositories/auth/reset-password-repository-impl';

import { MakeHttpClient } from '../../../http/make-http-client';

export const MakeResetPasswordRepository = () =>
  new ResetPasswordRepositoryImpl(
    makeApiUrl('/api/user/auth/reset-password'),
    MakeHttpClient(),
  );
