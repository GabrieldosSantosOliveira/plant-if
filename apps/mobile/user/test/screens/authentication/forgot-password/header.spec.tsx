import { act, fireEvent, render } from '@/jest/test-utils'
import { mockGoBack } from '@/test/screens/mocks/navigation/react-navigation-native-mock'
import { Header } from '@/ui/screens/authentication/forgot-password/header'
describe('<Header/>', () => {
  afterEach(() => {
    mockGoBack.mockClear()
  })
  it('should navigate to prev screen if user press button go back', async () => {
    const { getByTestId } = render(<Header />)
    const buttonGoBack = getByTestId('button-go-back')
    await act(async () => {
      fireEvent.press(buttonGoBack)
    })
    expect(mockGoBack).toHaveBeenCalled()
  })
})
