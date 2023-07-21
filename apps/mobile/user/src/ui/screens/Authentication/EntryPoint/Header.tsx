import { AuthRoutes } from '@/@types/navigation'
import { Icons } from '@/ui/components/icons/Icons'
import { Box } from '@/ui/components/shared/Box'
import { Text } from '@/ui/components/shared/Text'
import { TouchableOpacity } from '@/ui/components/shared/TouchableOpacity'
import { useTheme } from '@/ui/hooks/useTheme'
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
