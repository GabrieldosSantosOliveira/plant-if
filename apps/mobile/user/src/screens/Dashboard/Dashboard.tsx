import Farm from '@/assets/animations/farm.json'
import { Icons } from '@/components/icons/Icons'
import { Text } from '@/components/shared/Text'
import { View } from '@/components/shared/View'
import LottieView from 'lottie-react-native'

import { Button } from './components/Button'
import { ButtonSecondary } from './components/ButtonSecondary'
export const Dashboard = () => {
  return (
    <View
      bg="mainBackground"
      paddingHorizontal="l"
      flex={1}
      justifyContent="flex-end"
      gap="l"
      paddingVertical="l"
    >
      <LottieView
        source={Farm}
        autoPlay
        loop
        style={{ position: 'relative' }}
      />
      <Text variant="header" textAlign="center" selectable>
        Nós amamos ajudar você a plantar melhor
      </Text>
      <View gap="l">
        <Button icon={<Icons.facebookIcon />} title="Continuar com Facebook" />
        <Button icon={<Icons.appleIcon />} title="Continuar com Apple" />
        <Button icon={<Icons.googleIcon />} title="Continuar com Google" />
        <ButtonSecondary title="Outras opções" />
      </View>
    </View>
  )
}
