import { AuthRoutes } from '@/@types/navigation'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
export const Header = () => {
  const { goBack } = useNavigation<NavigationProp<AuthRoutes>>()
  const { colors } = useTheme()
  return (
    <Box width="100%" flexDirection="row" alignItems="center" gap="lg">
      <TouchableOpacity
        testID="button-go-back"
        onPress={goBack}
        width={50}
        height={50}
        borderRadius="rounded-full"
        justifyContent="center"
        alignItems="center"
        accessibilityLabel="Voltar"
        accessibilityHint="Navega para a tela anterior"
        style={styles.touchable}
      >
        <Icons.arrowLeft size={28} color={colors['text-primary']} />
      </TouchableOpacity>
      <Text variant="heading">Entre ou cadastre-se</Text>
    </Box>
  )
}
const styles = StyleSheet.create({
  touchable: {
    backgroundColor: 'rgba(12, 13, 52, 0.1)',
  },
})
