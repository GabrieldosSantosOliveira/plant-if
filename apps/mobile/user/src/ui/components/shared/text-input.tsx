import { Theme } from '@/ui/styles/theme';
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
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import {
  TextInputProps as RNTextInputProps,
  TextInput as RNTextInput,
} from 'react-native';
export type BaseTextInputProps = ColorProps<Theme> &
  VisibleProps<Theme> &
  TypographyProps<Theme> &
  SpacingProps<Theme> &
  TextShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  VariantProps<Theme, 'textVariants'>;

export const TextInput = createRestyleComponent<
  RNTextInputProps & BaseTextInputProps,
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
    createVariant({ themeKey: 'textVariants' }),
  ],
  RNTextInput,
);
export type TextInputProps = React.ComponentProps<typeof TextInput>;
