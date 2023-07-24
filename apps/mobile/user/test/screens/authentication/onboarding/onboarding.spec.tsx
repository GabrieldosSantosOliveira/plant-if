import { fireEvent, render } from '@/jest/test-utils'
import { Onboarding } from '@/ui/screens/authentication/onboarding/onboarding'
const mockedNavigate = jest.fn()
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
    const { getByText } = render(<Onboarding />)
    const button = getByText('entrar', { exact: false })
    fireEvent.press(button)
    expect(mockedNavigate).toHaveBeenCalled()
    expect(mockedNavigate).toHaveBeenCalledWith('EntryPoint')
  })
  describe('accessibility', () => {
    it('should has accessibilityLabel in Button', () => {
      const { getByLabelText } = render(<Onboarding />)
      const button = getByLabelText('Entre na aplicação', { exact: false })
      expect(button).toBeTruthy()
    })
    it('should has accessibilityHint in Button', () => {
      const { getAllByA11yHint } = render(<Onboarding />)
      const button = getAllByA11yHint('Navega para a tela de entrada', {
        exact: false,
      })
      expect(button).toBeTruthy()
    })
  })
})
