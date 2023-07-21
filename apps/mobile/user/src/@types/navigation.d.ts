/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  Onboarding: undefined
  SingIn: {
    email?: undefined
  }
  SingUp: {
    email?: undefined
  }
  ForgotPassword: {
    email?: undefined
  }
  EntryPoint: undefined
}
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
