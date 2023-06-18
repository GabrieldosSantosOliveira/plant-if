import { Box } from '@/components/shared/Box'
import { Text } from '@/components/shared/Text'
import { TouchableOpacity } from '@/components/shared/TouchableOpacity'
import { View } from '@/components/shared/View'
import { Theme } from '@/styles/theme'
import { useTheme } from '@shopify/restyle'
import { ReactNode, FC } from 'react'
import { AccessibilityProps, ActivityIndicator } from 'react-native'

export interface ButtonProps extends AccessibilityProps {
  icon: ReactNode
  title: string
  isLoading?: boolean
  onPress: () => void
}
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
          style={{ width: '100%', borderRadius: 4, paddingHorizontal: 10 }}
          height={52}
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
          style={{ width: '100%', borderRadius: 4, paddingHorizontal: 10 }}
          height={52}
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
