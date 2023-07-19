import { Theme } from '@/styles/theme'
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
import {
  TouchableOpacityProps as RNTouchableOpacityProps,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native'
export type BaseTouchableOpacityProps = ColorProps<Theme> &
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
export const TouchableOpacity = createRestyleComponent<
  RNTouchableOpacityProps & BaseTouchableOpacityProps,
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
  RNTouchableOpacity,
)
export type TouchableOpacityProps = React.ComponentProps<
  typeof TouchableOpacity
>
