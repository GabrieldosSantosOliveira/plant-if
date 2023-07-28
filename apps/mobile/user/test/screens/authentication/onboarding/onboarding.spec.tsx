import { act, fireEvent, render } from '@/jest/test-utils'
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
  it('should navigate to screen Login on user press button', async () => {
    const { getByTestId } = render(<Onboarding />)
    const button = getByTestId('button-next', { exact: false })
    await act(async () => {
      fireEvent.press(button)
    })
    expect(mockedNavigate).toHaveBeenCalled()
    expect(mockedNavigate).toHaveBeenCalledWith('login')
  })
  describe('accessibility', () => {
    it('should has accessibilityHint in Button', () => {
      const { getByTestId } = render(<Onboarding />)
      const button = getByTestId('button-next', { exact: false })
      expect(button).toHaveProp('accessibilityHint')
    })
  })
})
