import { makeApiUrl } from '@/constants/make-api-url';
import { AuthWithFacebookRepositoryImpl } from '@/infra/data-source/repositories/auth/auth-with-facebook-repository-impl';

import { MakeHttpClient } from '../../../http/make-http-client';

export const MakeAuthWithFacebookRepository = () =>
  new AuthWithFacebookRepositoryImpl(
    makeApiUrl('/api/user/auth/facebook'),
    MakeHttpClient(),
  );
