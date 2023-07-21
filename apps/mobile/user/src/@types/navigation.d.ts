/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  Onboarding: undefined
  SingIn: undefined
  SingUp: undefined
  ForgotPassword: undefined
}
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
