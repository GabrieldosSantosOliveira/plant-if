import {
  Onboarding,
  OnboardingProps,
} from '@/ui/screens/Authentication/Onboarding/Onboarding'
export type MakeOnboardingProps = Omit<OnboardingProps, 'storage'>
export const MakeOnboarding: React.FC<MakeOnboardingProps> = (props) => {
  return <Onboarding navigation={props.navigation} route={props.route} />
}
