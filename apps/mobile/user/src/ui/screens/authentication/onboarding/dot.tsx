import { useTheme } from '@/ui/hooks/use-theme'
import { StyleSheet } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
export interface DotProps {
  currentIndex: Animated.SharedValue<number>
  index: number
}
export const Dot: React.FC<DotProps> = ({ currentIndex, index }) => {
  const { colors } = useTheme()
  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.2, 1, 0.2],
      Extrapolate.CLAMP,
    ),
  }))
  const scale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          currentIndex.value,
          [index - 1, index, index + 1],
          [1, 1.25, 1],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }))
  return (
    <Animated.View
      style={[
        styles.container,
        opacity,
        scale,
        { backgroundColor: colors['text-primary'] },
      ]}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
})
