import { AuthContext } from '@/ui/contexts/auth-context';
import { useContext } from 'react';

import { WithoutProviderError } from './errors/without-provider-error';
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (Object.keys(value).length === 0) {
    throw new WithoutProviderError(
      'useAuth must be used within an AuthProvider',
    );
  }
  return value;
};
