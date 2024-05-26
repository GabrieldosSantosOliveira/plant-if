import { ForgotPasswordUseCase } from '@/domain/use-cases/forgot-password-use-case';
import { Icons } from '@/ui/components/icons/icons';
import { Box } from '@/ui/components/shared/box';
import { ScrollView } from '@/ui/components/shared/scroll-view';
import { useTheme } from '@/ui/hooks/use-theme';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../components/button';
import { ControlledInput } from '../components/input/controlled-input';
import { Root } from '../components/input/root';
import { forgotPasswordValidator } from './forgot-password-validator';
import { Header } from './header';
import { useForgotPassword } from './use-forgot-password';
export interface ForgotPasswordForm {
  email: string;
}
export interface ForgotPasswordParams {
  forgotPasswordUseCase: ForgotPasswordUseCase;
}
export const ForgotPassword: React.FC<ForgotPasswordParams> = ({
  forgotPasswordUseCase,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordValidator),
  });
  const { colors } = useTheme();
  const forgotPassword = useForgotPassword({ forgotPasswordUseCase });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box
        backgroundColor="main-background"
        flex={1}
        gap="md"
        paddingHorizontal="2xl"
        paddingVertical="lg"
      >
        <Header />
        <Root errorMessage={errors.email?.message} label="Email">
          <Icons.email color={colors['icon-main']} />
          <ControlledInput
            control={control}
            name="email"
            placeholder="Informe seu email"
            autoComplete="email"
            keyboardType="email-address"
            testID="input-email"
          />
        </Root>
        <Button
          type="primary"
          title="Continuar"
          testID="button-submit"
          isLoading={forgotPassword.isLoading}
          onPress={handleSubmit(
            async ({ email }) => await forgotPassword.execute(email),
          )}
        />
      </Box>
    </ScrollView>
  );
};
