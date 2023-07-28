/* eslint-disable @typescript-eslint/no-empty-interface */
export type AuthRoutes = {
  onboarding: undefined
  login: undefined
  'sing-up': undefined
  'forgot-password': undefined
  'reset-password': {
    email: string
  }
}
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
