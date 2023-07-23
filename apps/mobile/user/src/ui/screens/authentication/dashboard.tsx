import Farm from '@/ui/assets/animations/farm.json'
import { Icons } from '@/ui/components/icons/icons'
import { Text } from '@/ui/components/shared/text'
import { View } from '@/ui/components/shared/view'
import { Theme } from '@/ui/styles/theme'
import { useTheme } from '@shopify/restyle'
import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'

import { LoginButton } from './components/login-button'

export const Dashboard = () => {
  const { colors } = useTheme<Theme>()

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
          onPress={console.log}
          icon={<Icons.facebook />}
          title="Continuar com Facebook"
        />

        <LoginButton
          accessible
          accessibilityLabel="Entrar na aplicação"
          accessibilityHint="Cadastrar utilizando o google"
          onPress={console.log}
          icon={<Icons.google />}
          title="Continuar com Google"
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
