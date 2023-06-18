import { Feather } from '@expo/vector-icons'

import { AppleIcon } from './AppleIcon'
import { FacebookIcon } from './FacebookIcon'
import { GoogleIcon } from './GoogleIcon'
export interface IconProps {
  size?: number
  color: string
}
export const Icons = {
  googleIcon: ({ size = 24 }: Pick<IconProps, 'size'>) => (
    <GoogleIcon height={size} width={size} />
  ),
  appleIcon: ({ size = 24, color }: IconProps) => (
    <AppleIcon height={size} width={size} fill={color} color={color} />
  ),
  facebookIcon: ({ size = 24 }: Pick<IconProps, 'size'>) => (
    <FacebookIcon height={size} width={size} />
  ),
  email: ({ size = 24, color }: IconProps) => (
    <Feather name="mail" size={size} color={color} />
  ),
}
