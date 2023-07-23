import { Feather, AntDesign } from '@expo/vector-icons'

import { AppleIcon } from './apple-icon'
import { FacebookIcon } from './facebook-icon'
import { GoogleIcon } from './google-icon'
export interface IconProps {
  size?: number
  color: string
}
export const Icons = {
  google: ({ size = 24 }: Pick<IconProps, 'size'>) => (
    <GoogleIcon height={size} width={size} />
  ),
  apple: ({ size = 24, color }: IconProps) => (
    <AppleIcon height={size} width={size} fill={color} color={color} />
  ),
  facebook: ({ size = 24 }: Pick<IconProps, 'size'>) => (
    <FacebookIcon height={size} width={size} />
  ),
  email: ({ size = 24, color }: IconProps) => (
    <Feather name="mail" size={size} color={color} />
  ),
  arrowLeft: ({ size = 24, color }: IconProps) => (
    <AntDesign name="arrowleft" size={size} color={color} />
  ),
}
