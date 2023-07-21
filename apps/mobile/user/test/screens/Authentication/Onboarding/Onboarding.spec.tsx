import { AuthRoutes } from '@/@types/navigation'
import { fireEvent, render } from '@/jest/test-utils'
import { Onboarding } from '@/ui/screens/Authentication/Onboarding/Onboarding'

import { MakeNavigationMock } from '../../mocks/navigation/MakeNavigationMock'
import { MakeNavigationRouteMock } from '../../mocks/navigation/MakeNavigationRouteMock'
const makeSetup = () => {
  const mockNavigate = jest.fn()
  const navigate = MakeNavigationMock<AuthRoutes, 'Onboarding'>({
    navigate: mockNavigate,
  }).navigation
  const route = MakeNavigationRouteMock<AuthRoutes, 'Onboarding'>().route
  return { navigate, mockNavigate, route }
}
describe('<Onboarding />', () => {
  it('should navigate to screen SingUp if user press button', () => {
    const { mockNavigate, navigate, route } = makeSetup()
    const { getByText } = render(
      <Onboarding navigation={navigate} route={route} />,
    )
    const button = getByText('cadastrar', { exact: false })
    fireEvent.press(button)
    expect(mockNavigate).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('SingUp')
  })
  it('should navigate to screen SingIn if user press button', () => {
    const { mockNavigate, navigate, route } = makeSetup()
    const { getByText } = render(
      <Onboarding navigation={navigate} route={route} />,
    )
    const button = getByText('entrar', { exact: false })
    fireEvent.press(button)
    expect(mockNavigate).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('SingIn')
  })
})
