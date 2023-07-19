import { Box } from '@/ui/components/shared/Box'
import { Text } from '@/ui/components/shared/Text'
import { TouchableOpacity } from '@/ui/components/shared/TouchableOpacity'
import { View } from '@/ui/components/shared/View'
import { Theme } from '@/ui/styles/theme'
import { useTheme } from '@shopify/restyle'
import { ReactNode, FC } from 'react'
import { AccessibilityProps, ActivityIndicator } from 'react-native'

export interface ButtonProps extends AccessibilityProps {
  icon: ReactNode
  title: string
  isLoading?: boolean
  onPress: () => void
}
const HEIGHT = 52
export const Button: FC<ButtonProps> = ({
  icon,
  title,
  onPress,
  isLoading = false,
  ...props
}) => {
  const { colors } = useTheme<Theme>()
  return (
    <TouchableOpacity
      testID="id-button"
      disabled={isLoading}
      onPress={onPress}
      accessibilityRole="button"
      role="button"
      {...props}
    >
      {isLoading ? (
        <View
          width="100%"
          paddingHorizontal="md"
          borderRadius="rounded-lg"
          height={HEIGHT}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          borderColor="buttonBorder"
          borderWidth={1}
        >
          <ActivityIndicator
            testID="spinner"
            size="small"
            color={colors.textPrimary}
          />
        </View>
      ) : (
        <View
          borderRadius="rounded-lg"
          width="100%"
          paddingHorizontal="md"
          height={HEIGHT}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderColor="buttonBorder"
          borderWidth={1}
        >
          {icon}
          <Text variant="button">{title}</Text>
          <Box />
        </View>
      )}
    </TouchableOpacity>
  )
}
