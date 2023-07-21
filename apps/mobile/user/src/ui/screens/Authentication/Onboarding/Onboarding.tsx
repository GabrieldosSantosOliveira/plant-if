import { AuthRoutes } from '@/@types/navigation'
import { Box } from '@/ui/components/shared/Box'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useWindowDimensions, Vibration } from 'react-native'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'

import { Button } from './Button'
import { Dot } from './Dot'
import { slides } from './mocks'
import { Slide } from './Slide'
export type OnboardingProps = StackScreenProps<AuthRoutes, 'Onboarding'>
const FIFTY_MILLISECONDS = 50

export const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const { width } = useWindowDimensions()
  const x = useSharedValue(0)
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    x.value = contentOffset.x
  })

  const currentIndex = useDerivedValue(() => x.value / width)
  return (
    <Box flex={1} backgroundColor="main-background" paddingBottom="3xl">
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {slides.map(({ description, image, title }, index) => (
          <Slide
            key={index}
            description={description}
            image={image}
            title={title}
          />
        ))}
      </Animated.ScrollView>
      <Box
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap="md"
        paddingVertical="xl"
      >
        {slides.map((_, index) => (
          <Dot currentIndex={currentIndex} index={index} key={index} />
        ))}
      </Box>
      <Box
        flex={1}
        paddingHorizontal="2xl"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap="2xl"
      >
        <Button
          onPress={() => {
            Vibration.vibrate(FIFTY_MILLISECONDS)
            navigation.navigate('SingUp')
          }}
          title="Cadastrar"
        />
        <Button
          onPress={() => {
            Vibration.vibrate(FIFTY_MILLISECONDS)
            navigation.navigate('SingIn')
          }}
          title="Entrar"
          type="primary"
        />
      </Box>
    </Box>
  )
}
