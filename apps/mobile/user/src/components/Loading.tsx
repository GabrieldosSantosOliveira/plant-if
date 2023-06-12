import { ActivityIndicator } from 'react-native'

import { View } from './shared/View'

export const Loading = () => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" color={'black'} />
    </View>
  )
}
