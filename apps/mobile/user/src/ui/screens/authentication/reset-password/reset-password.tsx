import { AuthRoutes } from '@/@types/navigation';
import { ResetPasswordUseCase } from '@/domain/use-cases/reset-password-use-case';
import { Icons } from '@/ui/components/icons/icons';
import { Box } from '@/ui/components/shared/box';
import { ScrollView } from '@/ui/components/shared/scroll-view';
import { Text } from '@/ui/components/shared/text';
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity';
import { useTheme } from '@/ui/hooks/use-theme';
import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '../components/button';
import { ControlledInput } from '../components/input/controlled-input';
import { Root } from '../components/input/root';
import { Header } from './header';
import { resetPasswordValidator } from './reset-password-validator';
import { useResetPassword } from './use-reset-password';
export interface ResetPasswordForm {
  code: string;
  resetPassword: string;
}
type ResetPasswordParam = Pick<AuthRoutes, 'reset-password'>;
export interface ResetPasswordParams {
  resetPasswordUseCase: ResetPasswordUseCase;
}
export const ResetPassword: React.FC<ResetPasswordParams> = ({
  resetPasswordUseCase,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordValidator),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { params } = useRoute<RouteProp<ResetPasswordParam>>();
  const { colors } = useTheme();
  const { execute: onSubmit, isLoading } = useResetPassword({
    resetPasswordUseCase,
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box
        flex={1}
        gap="md"
        paddingVertical="lg"
        backgroundColor="main-background"
        paddingHorizontal="2xl"
      >
        <Header />
        <Text variant="input-label" textAlign="center">
          Insira o código de 6 dígitos enviado ao seu email {params.email}
        </Text>
        <Root errorMessage={errors.code?.message} label="Código">
          <ControlledInput
            placeholder="Código"
            keyboardType="numeric"
            control={control}
            name="code"
          />
        </Root>
        <Root errorMessage={errors.resetPassword?.message} label="Nova Senha">
          <Icons.lock color={colors['icon-main']} />
          <ControlledInput
            testID="input-password"
            control={control}
            name="resetPassword"
            placeholder="Informe sua nova senha"
            secureTextEntry={!showPassword}
            autoComplete="current-password"
          />
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icons.eye color={colors['icon-main']} />
            ) : (
              <Icons.eyeOff color={colors['icon-main']} />
            )}
          </TouchableOpacity>
        </Root>
        <Button
          type="primary"
          title="Alterar Senha"
          isLoading={isLoading}
          onPress={handleSubmit(async ({ code, resetPassword }) => {
            await onSubmit({ code, email: params.email, resetPassword });
          })}
        />
      </Box>
    </ScrollView>
  );
};
