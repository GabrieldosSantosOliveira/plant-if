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
  appleIcon: ({ size = 24 }: Pick<IconProps, 'size'>) => (
    <AppleIcon height={size} width={size} />
  ),
  facebookIcon: ({ size = 24 }: Pick<IconProps, 'size'>) => (
    <FacebookIcon height={size} width={size} />
  ),
}
