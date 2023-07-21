import { Box } from '@/ui/components/shared/Box'
import { Image } from '@/ui/components/shared/Image'
import { Text } from '@/ui/components/shared/Text'
import { Theme } from '@/ui/styles/theme'
import { useTheme } from '@shopify/restyle'
import { ImageRequireSource, useWindowDimensions } from 'react-native'
export interface SlideProps {
  title: string
  description: string
  image: {
    src: ImageRequireSource
    width: number
    height: number
  }
}
export const Slide: React.FC<SlideProps> = ({ description, image, title }) => {
  const { width } = useWindowDimensions()
  const { borderRadii } = useTheme<Theme>()
  const ratio = image.height / image.width
  const height = width * ratio
  return (
    <Box
      width={width}
      flex={1}
      alignItems="center"
      justifyContent="space-between"
      paddingTop="8xl"
    >
      <Image
        source={image.src}
        height={height}
        width={width - 100}
        alt="imagem"
        resizeMode="cover"
        style={{ borderRadius: borderRadii['rounded-3xl'] }}
      />
      <Box gap="md" width="100%" paddingHorizontal="3xl">
        <Text variant="hero" opacity={0.5}>
          {title}
        </Text>
        <Text variant="hero" fontSize={20}>
          {description}
        </Text>
      </Box>
    </Box>
  )
}
