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
import {
  KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
} from 'react-native'
export type BaseKeyboardAvoidingViewProps = ColorProps<Theme> &
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
export const KeyboardAvoidingView = createRestyleComponent<
  RNKeyboardAvoidingViewProps & BaseKeyboardAvoidingViewProps,
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
  RNKeyboardAvoidingView,
)
export type KeyboardAvoidingViewProps = React.ComponentProps<
  typeof KeyboardAvoidingView
>
