import React from 'react'

import {
  TouchableOpacity,
  TouchableOpacityProps,
} from './shared/touchable-opacity'

export type RoundedIconProps = TouchableOpacityProps
export const RoundedIcon: React.FC<RoundedIconProps> = (props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      width={50}
      height={50}
      borderRadius="rounded-full"
      justifyContent="center"
      alignItems="center"
      {...props}
    />
  )
}
