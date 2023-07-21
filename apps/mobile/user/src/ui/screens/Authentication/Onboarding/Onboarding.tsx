import { Box } from '@/ui/components/shared/Box'
import { useNavigation } from '@react-navigation/native'
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
const FIFTY_MILLISECONDS = 50

export const Onboarding: React.FC = () => {
  const { navigate } = useNavigation()
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
            navigate('EntryPoint')
          }}
          accessible
          accessibilityLabel="Entre na aplicação"
          accessibilityHint="Navega para a tela de entrada"
          title="Entrar"
          type="primary"
        />
      </Box>
    </Box>
  )
}
