import { makeApiUrl } from '@/constants/make-api-url';
import { ForgotPasswordRepositoryImpl } from '@/infra/data-source/repositories/auth/forgot-password-repository-impl';

import { MakeHttpClient } from '../../../http/make-http-client';

export const MakeForgotPasswordRepository = () =>
  new ForgotPasswordRepositoryImpl(
    makeApiUrl('/api/user/auth/forgot-password'),
    MakeHttpClient(),
  );
