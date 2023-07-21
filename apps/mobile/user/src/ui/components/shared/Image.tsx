import { Theme } from '@/ui/styles/theme'
import {
  createRestyleComponent,
  ColorProps,
  OpacityProps,
  VisibleProps,
  TypographyProps,
  SpacingProps,
  TextShadowProps,
  BackgroundColorProps,
  LayoutProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  color,
  visible,
  typography,
  spacing,
  textShadow,
  backgroundColor,
  opacity,
  layout,
  border,
  shadow,
  position,
} from '@shopify/restyle'
import React from 'react'
import { ImageProps as RNImageProps, Image as RNImage } from 'react-native'
export type BaseImageProps = ColorProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingProps<Theme> &
  TextShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme>
export const Image = createRestyleComponent<
  RNImageProps & BaseImageProps,
  Theme
>(
  [
    color,
    visible,
    typography,
    spacing,
    textShadow,
    backgroundColor,
    opacity,
    layout,
    border,
    shadow,
    position,
  ],
  RNImage,
)
export type ImageProps = React.ComponentProps<typeof Image>
