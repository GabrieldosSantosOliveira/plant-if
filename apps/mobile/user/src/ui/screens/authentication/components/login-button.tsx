import { Box } from '@/ui/components/shared/box'
import { Text } from '@/ui/components/shared/text'
import { TouchableOpacity } from '@/ui/components/shared/touchable-opacity'
import { View } from '@/ui/components/shared/view'
import { Theme } from '@/ui/styles/theme'
import { useTheme } from '@shopify/restyle'
import { ReactNode, FC } from 'react'
import { AccessibilityProps, ActivityIndicator, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export interface LoginButtonProps extends AccessibilityProps {
  icon: ReactNode
  title: string
  isLoading?: boolean
  onPress: () => void
}
const HEIGHT = 52
export const LoginButton: FC<LoginButtonProps> = ({
  icon,
  title,
  onPress,
  isLoading = false,
  ...props
}) => {
  const { colors } = useTheme<Theme>()
  const scaleDownAnimation = useSharedValue(1)
  const eventLongPress = Gesture.LongPress()
    .onBegin(() => {
      scaleDownAnimation.value = withSpring(0.93)
    })
    .onFinalize(() => {
      scaleDownAnimation.value = withSpring(1)
    })
  const scale = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleDownAnimation.value }],
    }
  })
  return (
    <GestureDetector gesture={eventLongPress}>
      <Animated.View style={[styles.container, scale]}>
        <TouchableOpacity
          testID="id-button"
          borderRadius="rounded-lg"
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
              borderColor="button-border"
              borderWidth={1}
            >
              <ActivityIndicator
                testID="spinner"
                size="small"
                color={colors['text-primary']}
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
              borderColor="button-border"
              borderWidth={1}
            >
              {icon}
              <Text variant="button">{title}</Text>
              <Box />
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  )
}
const styles = StyleSheet.create({
  container: { width: '100%', height: HEIGHT },
})
