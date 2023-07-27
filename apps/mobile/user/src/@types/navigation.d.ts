/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  Onboarding: undefined
  Login: undefined
  SingUp: undefined
  ForgotPassword: undefined
  ResetPassword: undefined
}
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
