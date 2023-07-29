import React from 'react'
import { ActivityIndicator } from 'react-native'

import { useTheme } from '../hooks/use-theme'
import { Box } from './shared/box'

export const Loading = () => {
  const { colors } = useTheme()
  return (
    <Box
      flex={1}
      backgroundColor="main-background"
      justifyContent="center"
      alignItems="center"
    >
      <ActivityIndicator size="large" color={colors['icon-main']} />
    </Box>
  )
}
