import { AuthRoutes } from '@/@types/navigation'
import { HttpClient } from '@/interfaces/http/HttpClient'
import { Box } from '@/ui/components/shared/Box'
import { StackScreenProps } from '@react-navigation/stack'
export interface SingUpProps
  extends StackScreenProps<AuthRoutes, 'Onboarding'> {
  httpClient: HttpClient
}
export const SingUp: React.FC<SingUpProps> = () => {
  return <Box />
}
