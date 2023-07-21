import { AuthRoutes } from '@/@types/navigation'
import { SingUp } from '@/ui/screens/Authentication/SingUp/SingUp'
import { StackScreenProps } from '@react-navigation/stack'
export type MakeSingUpProps = StackScreenProps<AuthRoutes, 'SingUp'>
export const MakeSingUp: React.FC<MakeSingUpProps> = () => {
  return <SingUp />
}
