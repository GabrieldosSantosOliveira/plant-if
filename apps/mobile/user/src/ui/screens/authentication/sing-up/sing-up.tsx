import { AuthRoutes } from '@/@types/navigation'
import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { SingUpWithEmailUseCase } from '@/domain/use-cases/sing-up-with-email-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { ScrollView } from '@/ui/components/shared/scroll-view'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import { ControlledInput } from '@/ui/screens/authentication/components/input/controlled-input'
import { Root } from '@/ui/screens/authentication/components/input/root'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../components/button'
import { Header } from './header'
import { singUpValidator } from './sing-up-validator'
import { SocialLogin } from './social-login'
import { useSingUpWithEmail } from './use-sing-up-with-email'
export interface SinUpForm {
  email: string
  firstName: string
  lastName: string
  password: string
}
export interface SingUpProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase
  authWithFacebookUseCase: AuthWithFacebookUseCase
  singUpWithEmailUseCase: SingUpWithEmailUseCase
}
export const SingUp: React.FC<SingUpProps> = ({
  authWithFacebookUseCase,
  authWithGoogleUseCase,
  singUpWithEmailUseCase,
}) => {
  const { navigate } = useNavigation<NavigationProp<AuthRoutes>>()
  const { colors } = useTheme()
  const { execute: onSubmit, isLoading } = useSingUpWithEmail({
    singUpWithEmailUseCase,
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SinUpForm>({
    resolver: yupResolver(singUpValidator),
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
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
          <ControlledInput
            control={control}
            name="firstName"
            placeholder="Informe seu nome"
            autoComplete="given-name"
          />
        </Root>
        <Root label="Sobrenome" errorMessage={errors.lastName?.message}>
          <ControlledInput
            control={control}
            name="lastName"
            placeholder="Informe seu sobrenome"
            autoComplete="family-name"
          />
        </Root>
        <Root label="Email" errorMessage={errors.email?.message}>
          <Icons.email color={colors['text-primary']} />
          <ControlledInput
            control={control}
            name="email"
            placeholder="Informe seu email"
            autoComplete="email"
            keyboardType="email-address"
          />
        </Root>

        <Root label="Senha" errorMessage={errors.password?.message}>
          <Icons.lock color={colors['text-primary']} />
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
  )
}
