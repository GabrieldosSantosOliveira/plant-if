import { ResetPasswordUseCase } from '@/domain/use-cases/reset-password-use-case';
import { useToast } from '@/ui/hooks/use-toast';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
export interface UseResetPasswordParams {
  resetPasswordUseCase: ResetPasswordUseCase;
}
export interface UseResetPasswordDto {
  code: string;
  email: string;
  resetPassword: string;
}
export const useResetPassword = ({
  resetPasswordUseCase,
}: UseResetPasswordParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();
  const toast = useToast();
  const execute = async ({
    code,
    email,
    resetPassword,
  }: UseResetPasswordDto) => {
    try {
      setIsLoading(true);
      const successOrFails = await resetPasswordUseCase.execute({
        code,
        email,
        resetPassword,
      });
      if (successOrFails.isLeft()) {
        return toast.error({
          title: successOrFails.value.message,
        });
      }
      toast.success({
        title: 'Senha alterada com sucesso',
      });
      navigate('login');
    } catch {
    } finally {
      setIsLoading(false);
    }
  };
  return { execute, isLoading };
};
