import { AuthRoutes } from '@/@types/navigation';
import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case';
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case';
import { SingUpWithEmailUseCase } from '@/domain/use-cases/sing-up-with-email-use-case';
import { Icons } from '@/ui/components/icons/icons';
import { Box } from '@/ui/components/shared/box';
import { ScrollView } from '@/ui/components/shared/scroll-view';
import { Text } from '@/ui/components/shared/text';
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity';
import { useTheme } from '@/ui/hooks/use-theme';
import { Root } from '@/ui/screens/authentication/components/input/root';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput as RNTextInput } from 'react-native';

import { Button } from '../components/button';
import { Input } from '../components/input/input';
import { Header } from './header';
import { singUpValidator } from './sing-up-validator';
import { SocialLogin } from './social-login';
import { useSingUpWithEmail } from './use-sing-up-with-email';
export interface SinUpForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
export interface SingUpProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase;
  authWithFacebookUseCase: AuthWithFacebookUseCase;
  singUpWithEmailUseCase: SingUpWithEmailUseCase;
}
export const SingUp: React.FC<SingUpProps> = ({
  authWithFacebookUseCase,
  authWithGoogleUseCase,
  singUpWithEmailUseCase,
}) => {
  const { navigate } = useNavigation<NavigationProp<AuthRoutes>>();
  const { colors } = useTheme();
  const { execute: onSubmit, isLoading } = useSingUpWithEmail({
    singUpWithEmailUseCase,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SinUpForm>({
    resolver: yupResolver(singUpValidator),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputLastNameRef = useRef<RNTextInput>(null);
  const inputEmailRef = useRef<RNTextInput>(null);
  const inputPasswordRef = useRef<RNTextInput>(null);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box
        flex={1}
        paddingVertical="lg"
        paddingHorizontal="2xl"
        backgroundColor="main-background"
        gap="md"
        justifyContent="flex-end"
      >
        <Header />
        <Root label="Nome" errorMessage={errors.firstName?.message}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                placeholder="Informe seu nome"
                autoComplete="given-name"
                onBlur={onBlur}
                onSubmitEditing={() => inputLastNameRef.current?.focus()}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Root>
        <Root label="Sobrenome" errorMessage={errors.lastName?.message}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                ref={inputLastNameRef}
                placeholder="Informe seu sobrenome"
                autoComplete="family-name"
                onBlur={onBlur}
                onSubmitEditing={() => inputEmailRef.current?.focus()}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Root>
        <Root label="Email" errorMessage={errors.email?.message}>
          <Icons.email color={colors['text-primary']} />
          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                ref={inputEmailRef}
                placeholder="Informe seu email"
                autoComplete="email"
                keyboardType="email-address"
                onBlur={onBlur}
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Root>
        <Root label="Senha" errorMessage={errors.password?.message}>
          <Icons.lock color={colors['text-primary']} />
          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                ref={inputPasswordRef}
                placeholder="Informe sua senha"
                secureTextEntry={!showPassword}
                autoComplete="current-password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icons.eye color={colors['text-primary']} />
            ) : (
              <Icons.eyeOff color={colors['text-primary']} />
            )}
          </TouchableOpacity>
        </Root>
        <Button
          title="Entrar"
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          type="primary"
        />
        <Box flexDirection="row" alignItems="center" gap="md" opacity={0.4}>
          <Box flex={1} height={1} bg="text-primary" />
          <Text variant="input-label">ou continuar com</Text>
          <Box flex={1} height={1} bg="text-primary" />
        </Box>
        <SocialLogin
          authWithFacebookUseCase={authWithFacebookUseCase}
          authWithGoogleUseCase={authWithGoogleUseCase}
        />
        <TouchableOpacity
          testID="button-login"
          accessibilityRole="button"
          alignItems="center"
          onPress={() => navigate('login')}
        >
          <Box flexDirection="row" gap="xs">
            <Text variant="text-placeholder">Já possui uma conta?</Text>
            <Text variant="text-placeholder" color="attention">
              Entre
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
};
