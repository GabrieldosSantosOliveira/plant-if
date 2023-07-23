import { AuthRoutes } from '@/@types/navigation'
import { SingUp } from '@/ui/screens/authentication/sing-up/sing-up'
import { StackScreenProps } from '@react-navigation/stack'
export type MakeSingUpProps = StackScreenProps<AuthRoutes, 'SingUp'>
export const MakeSingUp: React.FC<MakeSingUpProps> = () => {
  return <SingUp />
}
