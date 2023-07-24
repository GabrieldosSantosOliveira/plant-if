import { UserUiModelProvider } from '@/domain/use-cases/is-user-already-exists-use-case'

/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  Onboarding: undefined
  SingIn: {
    email: string
    provider?: UserUiModelProvider
  }
  SingUp: {
    email: string
  }
  ForgotPassword: {
    email: string
  }
  EntryPoint: undefined
}
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
