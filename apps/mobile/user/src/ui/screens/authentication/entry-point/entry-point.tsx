import { AuthWithFacebookUseCase } from '@/domain/use-cases/auth-with-facebook-use-case'
import { AuthWithGoogleUseCase } from '@/domain/use-cases/auth-with-google-use-case'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TextInput } from '@/ui/components/shared/text-input'
import { useAuthWithFacebook } from '@/ui/hooks/use-auth-with-facebook'
import { useAuthWithGoogle } from '@/ui/hooks/use-auth-with-google'
import React, { useId } from 'react'

import { LoginButton } from '../components/login-button'
import { Button } from './button'
import { Header } from './header'
export interface EntryPointProps {
  authWithFacebookUseCase: AuthWithFacebookUseCase
  authWithGoogleUseCase: AuthWithGoogleUseCase
}

export const EntryPoint: React.FC<EntryPointProps> = ({
  authWithFacebookUseCase,
  authWithGoogleUseCase,
}) => {
  const authWithGoogle = useAuthWithGoogle({
    authWithGoogleUseCase,
  })
  const authWithFacebook = useAuthWithFacebook({
    authWithFacebookUseCase,
  })
  const emailID = useId()

  return (
    <Box
      flex={1}
      backgroundColor="main-background"
      paddingVertical="lg"
      paddingHorizontal="2xl"
      gap="md"
    >
      <Header />
      <Text variant="hero" fontSize={16}>
        Email
      </Text>
      <TextInput
        height={52}
        borderWidth={2}
        borderRadius="rounded-lg"
        paddingHorizontal="md"
        autoComplete="email"
        keyboardType="email-address"
        placeholder="Informe o seu email"
        accessibilityLabelledBy={emailID}
        variant="input"
      />
      <Button title="Continuar" type="primary" onPress={console.log} />
      <Box gap="xl">
        <Box
          width="100%"
          flexDirection="row"
          alignItems="center"
          gap="md"
          opacity={0.4}
        >
          <Box flex={1} height={1} backgroundColor="text-primary" />
          <Text>ou</Text>
          <Box flex={1} height={1} backgroundColor="text-primary" />
        </Box>

        <LoginButton
          icon={<Icons.facebook />}
          title="Continuar com Facebook"
          onPress={authWithFacebook.promptAsync}
          isLoading={authWithFacebook.isLoading}
        />
        <LoginButton
          icon={<Icons.google />}
          title="Continuar com Google"
          onPress={authWithGoogle.promptAsync}
          isLoading={authWithGoogle.isLoading}
        />
      </Box>
    </Box>
  )
}
