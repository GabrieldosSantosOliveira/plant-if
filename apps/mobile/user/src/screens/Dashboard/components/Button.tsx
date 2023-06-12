import { Box } from '@/components/shared/Box'
import { Text } from '@/components/shared/Text'
import { TouchableOpacity } from '@/components/shared/TouchableOpacity'
import { View } from '@/components/shared/View'
import { ReactNode, FC } from 'react'
import { AccessibilityProps } from 'react-native'

export interface ButtonProps extends AccessibilityProps {
  icon: ReactNode
  title: string
  onPress: () => void
}
export const Button: FC<ButtonProps> = ({ icon, title, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  )
}
