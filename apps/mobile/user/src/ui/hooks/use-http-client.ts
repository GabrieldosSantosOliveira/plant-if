import { HttpClientContext } from '@/ui/contexts/http-client-context';
import { useContext } from 'react';

import { WithoutProviderError } from './errors/without-provider-error';
export const useHttpClient = () => {
  const value = useContext(HttpClientContext);
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useHttpClient must be used within an HttpClientContext',
    );
  }
  return value;
};
