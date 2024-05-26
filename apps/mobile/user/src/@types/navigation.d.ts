export type AuthRoutes = {
  onboarding: undefined;
  login: undefined;
  'sing-up': undefined;
  'forgot-password': undefined;
  'reset-password': {
    email: string;
  };
};
export type AppRoutes = {
  home: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutes {}
  }
}
