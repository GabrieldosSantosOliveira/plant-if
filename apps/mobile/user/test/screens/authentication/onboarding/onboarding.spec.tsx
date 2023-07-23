import { AuthRoutes } from '@/@types/navigation'
import { fireEvent, render } from '@/jest/test-utils'
import { Onboarding } from '@/ui/screens/authentication/onboarding/onboarding'
import { createStackNavigator } from '@react-navigation/stack'
const mockedNavigate = jest.fn()
const Stack = createStackNavigator<AuthRoutes>()
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  }
})
describe('<Onboarding />', () => {
  it('should navigate to screen EntryPoint on user press button', () => {
    const { getByText } = render(
      <Stack.Navigator>
        <Stack.Screen component={Onboarding} name="Onboarding" />
      </Stack.Navigator>,
    )
    const button = getByText('entrar', { exact: false })
    fireEvent.press(button)
    expect(mockedNavigate).toHaveBeenCalled()
    expect(mockedNavigate).toHaveBeenCalledWith('EntryPoint')
  })
})
