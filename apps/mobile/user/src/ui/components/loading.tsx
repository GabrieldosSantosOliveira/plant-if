import React from 'react'
import { ActivityIndicator } from 'react-native'

import { Box } from './shared/box'

export const Loading = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" color={'black'} />
    </Box>
  )
}
