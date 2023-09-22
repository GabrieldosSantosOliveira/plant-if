import { Icons } from '@/ui/components/icons/icons'
import { Box } from '@/ui/components/shared/box'
import { StyleSheet } from 'react-native'

export const Area = () => {
  return (
    <Box
      height={70}
      width="100%"
      borderWidth={1}
      borderRadius="rounded-xl"
      style={styles.icon}
    >
      <Icons.tractor size={100} color="#fff" />
    </Box>
  )
}
const styles = StyleSheet.create({
  icon: {
    borderColor: '#53C351',
  },
})
