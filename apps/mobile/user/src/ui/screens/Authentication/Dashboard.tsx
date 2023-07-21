import Farm from '@/ui/assets/animations/farm.json'
import { Icons } from '@/ui/components/icons/Icons'
import { Text } from '@/ui/components/shared/Text'
import { View } from '@/ui/components/shared/View'
import { useAuth } from '@/ui/hooks/useAuth'
import { Theme } from '@/ui/styles/theme'
import { useTheme } from '@shopify/restyle'
import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { LoginButton } from './components/LoginButton'

export const Dashboard = () => {
  const { promptSingInWithGoogle, promptSingInWithFacebook } = useAuth()
  const { colors } = useTheme<Theme>()
  const [isLoadingFacebook, setIsLoadingFacebook] = useState<boolean>(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)

  return (
    <View
      bg="main-background"
      paddingHorizontal="2xl"
      flex={1}
      justifyContent="flex-end"
      gap="2xl"
      paddingVertical="2xl"
    >
      <LottieView
        source={Farm}
        autoPlay
        loop
        resizeMode="contain"
        style={styles.lottie}
      />
      <Text variant="header" textAlign="center">
        Nós amamos ajudar você a plantar melhor
      </Text>
      <View gap="2xl">
        <LoginButton
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o facebook"
          onPress={async () => {
            setIsLoadingFacebook(true)
            promptSingInWithFacebook().finally(() =>
              setIsLoadingFacebook(false),
            )
          }}
          icon={<Icons.facebook />}
          title="Continuar com Facebook"
          isLoading={isLoadingFacebook}
        />

        <LoginButton
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o google"
          onPress={async () => {
            setIsLoadingGoogle(true)
            promptSingInWithGoogle().finally(() => setIsLoadingGoogle(false))
          }}
          icon={<Icons.google />}
          title="Continuar com Google"
          isLoading={isLoadingGoogle}
        />
        <LoginButton
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o email"
          onPress={console.log}
          icon={<Icons.email color={colors['text-primary']} />}
          title="Continuar com email"
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  lottie: {
    position: 'relative',
  },
})
