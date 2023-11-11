import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useNavigation } from '@react-navigation/native'

export const ButtonForgotPassword = () => {
  const { navigate } = useNavigation()
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <TouchableOpacity
        accessibilityRole="button"
        testID="button-forgot-password"
        onPress={() => navigate('forgot-password')}
      >
        <Text variant="text-placeholder" color="attention">
          Esqueceu sua senha?
        </Text>
      </TouchableOpacity>
    </Box>
  )
}
