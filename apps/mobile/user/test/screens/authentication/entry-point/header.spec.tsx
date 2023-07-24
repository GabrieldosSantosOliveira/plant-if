import { fireEvent, render } from '@/jest/test-utils'
import { Header } from '@/ui/screens/authentication/entry-point/header'
const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})
describe('<Header/>', () => {
  it('should navigate to prev screen', () => {
    const { getByTestId } = render(<Header />)
    const buttonGoBack = getByTestId('button-go-back')
    fireEvent.press(buttonGoBack)
    expect(mockGoBack).toHaveBeenCalled()
  })
  describe('accessibility', () => {
    it('should has accessibilityLabel in button go back', () => {
      const { getByTestId } = render(<Header />)
      const buttonGoBack = getByTestId('button-go-back')
      expect(buttonGoBack).toHaveProp('accessibilityLabel')
    })
    it('should has accessibilityHint in button go back', () => {
      const { getByTestId } = render(<Header />)
      const buttonGoBack = getByTestId('button-go-back')
      expect(buttonGoBack).toHaveProp('accessibilityHint')
    })
  })
})
