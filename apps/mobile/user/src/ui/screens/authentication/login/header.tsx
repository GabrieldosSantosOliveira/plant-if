import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export const Header = () => {
  const { goBack } = useNavigation()
  const { colors } = useTheme()
  return (
    <Box>
      <TouchableOpacity
        accessibilityRole="button"
        width={50}
        height={50}
        borderRadius="rounded-full"
        justifyContent="center"
        alignItems="center"
        onPress={goBack}
      >
        <Icons.arrowLeft color={colors['text-primary']} />
      </TouchableOpacity>
      <Text variant="heading">Entrar</Text>
    </Box>
  )
}
