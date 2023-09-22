import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons'

import { AppleIcon } from './apple-icon'
import { ArrowLeft } from './arrow-left'
import { Email } from './email'
import { FacebookIcon } from './facebook-icon'
import { GoogleIcon } from './google-icon'
import { Tractor } from './tractor'
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
    <Email height={size} width={size} color={color} />
  ),
  arrowLeft: ({ size = 24, color }: IconProps) => (
    <ArrowLeft width={size} height={size} fill={color} />
  ),
  errorOutline: ({ size = 24, color }: IconProps) => (
    <MaterialIcons name="error-outline" size={size} color={color} />
  ),
  checkCircleo: ({ size = 24, color }: IconProps) => (
    <AntDesign name="checkcircleo" size={size} color={color} />
  ),
  lock: ({ size = 24, color }: IconProps) => (
    <Feather name="lock" size={size} color={color} />
  ),
  eye: ({ size = 24, color }: IconProps) => (
    <Feather name="eye" size={size} color={color} />
  ),
  eyeOff: ({ size = 24, color }: IconProps) => (
    <Feather name="eye-off" size={size} color={color} />
  ),
  tractor: ({ size = 24, color }: IconProps) => (
    <Tractor width={size} height={size} color={color} />
  ),
}
