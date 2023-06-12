import { Text } from '@/components/shared/Text'
import { TouchableOpacity } from '@/components/shared/TouchableOpacity'
import { View } from '@/components/shared/View'
import { FC } from 'react'
import { AccessibilityProps } from 'react-native'

export interface ButtonSecondaryProps extends AccessibilityProps {
  title: string
  onPress: () => void
}
export const ButtonSecondary: FC<ButtonSecondaryProps> = ({
  title,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{ width: '100%', borderRadius: 4, paddingHorizontal: 10 }}
        height={52}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        borderColor="buttonBorder"
        borderWidth={1}
      >
        <Text variant="button" textAlign="center">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
