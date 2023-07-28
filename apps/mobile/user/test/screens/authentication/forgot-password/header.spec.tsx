import { act, fireEvent, render } from '@/jest/test-utils'
import { Header } from '@/ui/screens/authentication/forgot-password/header'
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
  it('should navigate to prev screen if user press button go back', async () => {
    const { getByTestId } = render(<Header />)
    const buttonGoBack = getByTestId('button-go-back')
    await act(async () => {
      fireEvent.press(buttonGoBack)
    })
    expect(mockGoBack).toHaveBeenCalled()
  })
})
