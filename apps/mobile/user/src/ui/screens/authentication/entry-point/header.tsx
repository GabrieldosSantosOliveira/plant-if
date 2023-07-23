import { AuthRoutes } from '@/@types/navigation'
import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import { NavigationProp, useNavigation } from '@react-navigation/native'
export const Header = () => {
  const { goBack } = useNavigation<NavigationProp<AuthRoutes>>()
  const { colors } = useTheme()
  return (
    <Box width="100%" flexDirection="row" alignItems="center" gap="lg">
      <TouchableOpacity
        onPress={goBack}
        width={40}
        height={40}
        borderRadius="rounded-full"
        justifyContent="center"
        alignItems="center"
      >
        <Icons.arrowLeft size={28} color={colors['text-primary']} />
      </TouchableOpacity>
      <Text fontSize={18} fontFamily="Poppins_500Medium" variant="hero">
        Entre ou cadastre-se
      </Text>
    </Box>
  )
}
