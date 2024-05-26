import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { env } from './../../constants/env';
import { useAuth } from './use-auth';
import { useToast } from './use-toast';
const CLIENT_ID =
  Platform.OS === 'ios'
    ? env.GOOGLE_CLIENT_ID_IOS
    : env.GOOGLE_CLIENT_ID_ANDROID;
export interface UseAuthWithGoogleProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase;
}
export const useAuthWithGoogle = ({
  authWithGoogleUseCase,
}: UseAuthWithGoogleProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useAuth();
  const toast = useToast();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      offlineAccess: true,
      iosClientId: env.GOOGLE_CLIENT_ID_IOS,
      webClientId: CLIENT_ID,
    });
  }, []);
  const promptAsync = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      const userOrError = await authWithGoogleUseCase.execute(accessToken);
      if (userOrError.isRight()) {
        setUser(userOrError.value);
      }
      if (userOrError.isLeft()) {
        toast.error({
          title: userOrError.value.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { promptAsync, isLoading };
};
