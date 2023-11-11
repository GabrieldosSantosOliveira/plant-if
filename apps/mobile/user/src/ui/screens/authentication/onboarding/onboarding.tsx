import { Box } from '@/ui/components/shared/box'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'

import { Button } from './../components/button'
import { Dot } from './dot'
import { Slide } from './slide'
import { slides } from './slides'

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
        <Box flexDirection="row" gap="md">
          <Button
            onPress={() => navigate('login')}
            accessible
            accessibilityHint="Navega para a tela de autenticação"
            title="Continuar"
            type="primary"
            testID="button-next"
          />
        </Box>
      </Box>
    </Box>
  )
}
