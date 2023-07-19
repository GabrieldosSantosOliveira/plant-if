import Farm from '@/assets/animations/farm.json'
import { Icons } from '@/components/icons/Icons'
import { Text } from '@/components/shared/Text'
import { View } from '@/components/shared/View'
import { useAuth } from '@/hooks/useAuth'
import { Theme } from '@/styles/theme'
import { useTheme } from '@shopify/restyle'
import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Button } from './components/Button'

export const Dashboard = () => {
  const { promptSingInWithGoogle, promptSingInWithFacebook } = useAuth()
  const { colors } = useTheme<Theme>()
  const [isLoadingFacebook, setIsLoadingFacebook] = useState<boolean>(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)

  return (
    <View
      bg="mainBackground"
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
        <Button
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o facebook"
          onPress={async () => {
            setIsLoadingFacebook(true)
            promptSingInWithFacebook().finally(() =>
              setIsLoadingFacebook(false),
            )
          }}
          icon={<Icons.facebookIcon />}
          title="Continuar com Facebook"
          isLoading={isLoadingFacebook}
        />

        <Button
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o google"
          onPress={async () => {
            setIsLoadingGoogle(true)
            promptSingInWithGoogle().finally(() => setIsLoadingGoogle(false))
          }}
          icon={<Icons.googleIcon />}
          title="Continuar com Google"
          isLoading={isLoadingGoogle}
        />
        <Button
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o email"
          onPress={() => {}}
          icon={<Icons.email color={colors.textPrimary} />}
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
