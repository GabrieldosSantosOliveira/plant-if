/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  onboarding: undefined
  login: undefined
  'sing-up': undefined
  'forgot-password': undefined
  'reset-password': undefined
}
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
