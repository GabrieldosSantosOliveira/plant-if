import { act, fireEvent, render } from '@/jest/test-utils'
import {
  mockGoBack,
  mockNavigate,
} from '@/test/screens/mocks/navigation/use-navigation-mock'
import { Onboarding } from '@/ui/screens/authentication/onboarding/onboarding'
describe('<Onboarding />', () => {
  afterEach(() => {
    mockGoBack.mockClear()
    mockNavigate.mockClear()
  })
  it('should navigate to screen Login on user press button', async () => {
    const { getByTestId } = render(<Onboarding />)
    const button = getByTestId('button-next', { exact: false })
    await act(async () => {
      fireEvent.press(button)
    })
    expect(mockNavigate).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('login')
  })
  describe('accessibility', () => {
    it('should has accessibilityHint in Button', () => {
      const { getByTestId } = render(<Onboarding />)
      const button = getByTestId('button-next', { exact: false })
      expect(button).toHaveProp('accessibilityHint')
    })
  })
})
