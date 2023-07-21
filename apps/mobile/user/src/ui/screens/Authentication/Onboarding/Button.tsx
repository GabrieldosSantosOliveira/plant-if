import { Box } from '@/ui/components/shared/Box'
import { Text } from '@/ui/components/shared/Text'
import { TouchableOpacity } from '@/ui/components/shared/TouchableOpacity'
import React from 'react'
import { AccessibilityProps } from 'react-native'
export interface ButtonProps extends AccessibilityProps {
  onPress: () => void
  title: string
  type?: 'default' | 'primary'
}
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  type = 'default',
  ...props
}) => {
  return (
    <TouchableOpacity
      role="button"
      testID="id-button"
      accessibilityRole="button"
      onPress={onPress}
      height={52}
      flex={1}
      borderRadius="rounded-lg"
      borderWidth={1}
      borderColor={type === 'default' ? 'text-primary' : 'main-background'}
      backgroundColor={type === 'default' ? 'main-background' : 'text-primary'}
      {...props}
    >
      <Box justifyContent="center" alignItems="center" flex={1}>
        <Text
          variant="hero"
          fontFamily="Poppins_400Regular"
          color={type === 'default' ? 'text-primary' : 'main-background'}
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
