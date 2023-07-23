import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { useTheme } from '@/ui/hooks/use-theme'
import React from 'react'
import { AccessibilityProps, ActivityIndicator } from 'react-native'
export interface ButtonProps extends AccessibilityProps {
  onPress: () => void
  title: string
  type?: 'default' | 'primary'
  isLoading?: boolean
}
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  type = 'default',
  isLoading = false,
  ...props
}) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      disabled={isLoading}
      role="button"
      testID="id-button"
      accessibilityRole="button"
      onPress={onPress}
      height={52}
      width="100%"
      borderRadius="rounded-lg"
      borderWidth={1}
      borderColor={type === 'default' ? 'text-primary' : 'main-background'}
      backgroundColor={type === 'default' ? 'main-background' : 'text-primary'}
      {...props}
    >
      <Box justifyContent="center" alignItems="center" flex={1}>
        {isLoading ? (
          <ActivityIndicator
            color={
              type === 'default'
                ? colors['text-primary']
                : colors['main-background']
            }
            size="small"
          />
        ) : (
          <Text
            variant="hero"
            fontFamily="Poppins_400Regular"
            color={type === 'default' ? 'text-primary' : 'main-background'}
          >
            {title}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  )
}
