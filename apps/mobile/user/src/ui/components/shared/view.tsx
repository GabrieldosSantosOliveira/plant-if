import { Theme } from '@/ui/styles/theme'
import { createBox } from '@shopify/restyle'
import React from 'react'
export const View = createBox<Theme>()
export type ViewProps = React.ComponentProps<typeof View>
