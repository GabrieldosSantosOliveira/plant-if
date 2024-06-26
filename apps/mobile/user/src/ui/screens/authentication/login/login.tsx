import { AuthWithEmailUseCase } from '@/domain/use-cases/auth-with-email-use-case';
import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case';
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case';
import { Icons } from '@/ui/components/icons/icons';
import { Box } from '@/ui/components/shared/box';
import { ScrollView } from '@/ui/components/shared/scroll-view';
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity';
import { useAuthWithEmail } from '@/ui/hooks/use-auth-with-email';
import { useTheme } from '@/ui/hooks/use-theme';
import { ControlledInput } from '@/ui/screens/authentication/components/input/controlled-input';
import { Root } from '@/ui/screens/authentication/components/input/root';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from './../components/button';
import { ButtonForgotPassword } from './button-forgot-password';
import { ContinueWith } from './continue-with';
import { Header } from './header';
import { loginValidator } from './login-validator';
import { NoHaveAccount } from './no-have-account';
import { SocialLogin } from './social-login';

export interface LoginProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase;
  authWithFacebookUseCase: AuthWithFacebookUseCase;
  authWithEmailUseCase: AuthWithEmailUseCase;
}
export interface LoginForm {
  password: string;
  email: string;
}

export const Login: React.FC<LoginProps> = ({
  authWithGoogleUseCase,
  authWithFacebookUseCase,
  authWithEmailUseCase,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();

  const authWithEmail = useAuthWithEmail({
    authWithEmailUseCase,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginValidator),
  });

  const onSubmit = async ({ email, password }: LoginForm) => {
    await authWithEmail.execute({
      email,
      password,
    });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box
        flex={1}
        paddingVertical="lg"
        paddingHorizontal="2xl"
        backgroundColor="main-background"
        gap="md"
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
        <Root errorMessage={errors.password?.message} label="Senha">
          <Icons.lock color={colors['icon-main']} />
          <ControlledInput
            testID="input-password"
            control={control}
            name="password"
            placeholder="Informe sua senha"
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
        <ButtonForgotPassword />
        <Button
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
          isLoading={authWithEmail.isLoading}
          type="primary"
          testID="button-submit"
        />
        <ContinueWith />
        <SocialLogin
          authWithFacebookUseCase={authWithFacebookUseCase}
          authWithGoogleUseCase={authWithGoogleUseCase}
        />
        <NoHaveAccount />
      </Box>
    </ScrollView>
  );
};
