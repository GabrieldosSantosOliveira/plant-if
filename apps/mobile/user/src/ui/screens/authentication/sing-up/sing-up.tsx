import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { ScrollView } from '@/ui/components/shared/scroll-view'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useAuthWithFacebook } from '@/ui/hooks/use-auth-with-facebook'
import { useAuthWithGoogle } from '@/ui/hooks/use-auth-with-google'
import { useTheme } from '@/ui/hooks/use-theme'
import { ControlledInput } from '@/ui/screens/authentication/components/input/controlled-input'
import { Root } from '@/ui/screens/authentication/components/input/root'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../components/button'
import { LoginButton } from '../components/login-button'
import { Header } from './header'
export interface SinUpForm {
  email: string
  firstName: string
  lastName: string
  password: string
}
export interface SingUpProps {
  authWithGoogleUseCase: AuthWithGoogleUseCase
  authWithFacebookUseCase: AuthWithFacebookUseCase
}
export const SingUp: React.FC<SingUpProps> = ({
  authWithFacebookUseCase,
  authWithGoogleUseCase,
}) => {
  const authWithGoogle = useAuthWithGoogle({
    authWithGoogleUseCase,
  })
  const authWithFacebook = useAuthWithFacebook({
    authWithFacebookUseCase,
  })
  const { spacing, colors } = useTheme()
  const { control, handleSubmit } = useForm<SinUpForm>()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <Box
      flex={1}
      paddingVertical="lg"
      paddingHorizontal="2xl"
      backgroundColor="main-background"
      gap="2xl"
    >
      <Header />
      <ScrollView
        contentContainerStyle={{ gap: spacing['2xl'] }}
        showsVerticalScrollIndicator={false}
      >
        <Root>
          <Icons.email color={colors['text-primary']} />
          <ControlledInput
            control={control}
            name="email"
            placeholder="Informe sua senha"
            autoComplete="email"
          />
        </Root>

        <Root>
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
          onPress={handleSubmit(console.log)}
          type="primary"
        />
        <Box gap="md">
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
      </ScrollView>
    </Box>
  )
}
