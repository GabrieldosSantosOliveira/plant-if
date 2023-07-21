import { HttpClient } from '@/interfaces/http/HttpClient'
import { SecureStorage } from '@/interfaces/storage/SecureStorage'
import { Icons } from '@/ui/components/icons/Icons'
import { Box } from '@/ui/components/shared/Box'
import { Text } from '@/ui/components/shared/Text'
import { TextInput } from '@/ui/components/shared/TextInput'
import { useAuthWithApple } from '@/ui/hooks/useAuthWithApple'
import { useAuthWithFacebook } from '@/ui/hooks/useAuthWithFacebook'
import { useAuthWithGoogle } from '@/ui/hooks/useAuthWithGoogle'
import { useTheme } from '@/ui/hooks/useTheme'
import React, { useId } from 'react'

import { LoginButton } from './../components/LoginButton'
import { Button } from './Button'
import { Header } from './Header'
export interface EntryPointProps {
  httpClient: HttpClient
  secureStorage: SecureStorage
}
export const EntryPoint: React.FC<EntryPointProps> = ({
  httpClient,
  secureStorage,
}) => {
  const { colors } = useTheme()
  const authWithGoogle = useAuthWithGoogle({
    httpClient,
    secureStorage,
  })
  const authWithFacebook = useAuthWithFacebook({ httpClient, secureStorage })
  const authWithApple = useAuthWithApple({ httpClient, secureStorage })
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
          icon={<Icons.apple color={colors['text-primary']} />}
          title="Continuar com a apple"
          onPress={authWithApple.promptAsync}
          isLoading={authWithApple.isLoading}
        />
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
