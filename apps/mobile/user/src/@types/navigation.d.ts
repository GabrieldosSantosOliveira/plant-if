import { UserUiModelProvider } from '@/domain/ui-model/user-ui-model'

/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  Onboarding: undefined
  SingIn: {
    email: string
    provider: UserUiModelProvider
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
