import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useAuthWithFacebook } from '@/ui/hooks/use-auth-with-facebook'
import { useAuthWithGoogle } from '@/ui/hooks/use-auth-with-google'
import { useTheme } from '@/ui/hooks/use-theme'
import { ControlledInput } from '@/ui/screens/authentication/components/input/controlled-input'
import { Root } from '@/ui/screens/authentication/components/input/root'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { CheckBox } from '../components/checkbox'
import { LoginButton } from '../components/login-button'
import { Button } from './../components/button'
import { Header } from './header'
export interface LoginProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase
  authWithFacebookUseCase: AuthWithFacebookUseCase
}
export interface LoginForm {
  password: string
  email: string
}
const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Informe seu email')
    .required('Informe seu email'),
  password: yup
    .string()
    .trim()
    .min(4, 'A senha precisa ter no mínimo 4 caracteres')
    .required('Informe sua senha'),
})
export const Login: React.FC<LoginProps> = ({
  authWithGoogleUseCase,
  authWithFacebookUseCase,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })
  const [showPassword, setShowPassword] = useState(false)
  const authWithGoogle = useAuthWithGoogle({
    authWithGoogleUseCase,
  })
  const authWithFacebook = useAuthWithFacebook({
    authWithFacebookUseCase,
  })
  const { colors } = useTheme()

  return (
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
          secureTextEntry={!showPassword}
          autoComplete="email"
          keyboardType="email-address"
        />
      </Root>
      <Root errorMessage={errors.password?.message} label="Senha">
        <Icons.lock color={colors['icon-main']} />
        <ControlledInput
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
      <Box flexDirection="row" justifyContent="space-between">
        <CheckBox onChanged={console.log} label="Salvar sessão" />
        <TouchableOpacity accessibilityRole="button">
          <Text variant="text-placeholder" color="attention">
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
      </Box>
      <Button
        title="Entrar"
        onPress={handleSubmit(console.log)}
        type="primary"
      />
      <Box flexDirection="row" alignItems="center" gap="md" opacity={0.4}>
        <Box flex={1} height={1} bg="text-primary" />
        <Text variant="input-label">ou continuar com</Text>
        <Box flex={1} height={1} bg="text-primary" />
      </Box>
      <Box gap="md" flex={1} flexDirection="row" justifyContent="center">
        <LoginButton
          icon={<Icons.facebook />}
          onPress={authWithFacebook.promptAsync}
          isLoading={authWithFacebook.isLoading}
        />
        <LoginButton
          icon={<Icons.google />}
          onPress={authWithGoogle.promptAsync}
          isLoading={authWithGoogle.isLoading}
        />
      </Box>
      <TouchableOpacity accessibilityRole="button" alignItems="center">
        <Box flexDirection="row" gap="xs">
          <Text variant="text-placeholder">Não tem uma conta?</Text>
          <Text variant="text-placeholder" color="attention">
            Cadastre-se
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  )
}
