import { render, fireEvent } from '@/jest/test-utils'
import { makeFaker } from '@/test/mock/faker'
import { Button } from '@/ui/screens/authentication/components/button'
const { faker } = makeFaker()
describe('<Button />', () => {
  it('should render with correct title', () => {
    const title = faker.lorem.words()
    const { getByText } = render(<Button title={title} onPress={jest.fn()} />)
    expect(getByText(title)).toBeTruthy()
  })
  it('should show spinner if isLoading is true', () => {
    const title = faker.person.bio()
    const { getByTestId } = render(
      <Button title={title} onPress={jest.fn()} isLoading />,
    )
    const activityIndicator = getByTestId('activity-indicator')
    expect(activityIndicator).toBeTruthy()
  })
  it('should not show spinner if isLoading is false', () => {
    const title = faker.person.bio()
    const { queryByTestId } = render(
      <Button title={title} onPress={jest.fn()} isLoading={false} />,
    )
    const activityIndicator = queryByTestId('activity-indicator')
    expect(activityIndicator).toBeFalsy()
  })

  it('should call onPress on user press', () => {
    const title = faker.person.bio()
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Button title={title} onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId('id-button'))
    expect(onPressMock).toHaveBeenCalled()
  })

  describe('accessibility', () => {
    it('should be role button', () => {
      const title = faker.person.bio()
      const onPressMock = jest.fn()
      const { getByRole } = render(
        <Button title={title} onPress={onPressMock} />,
      )
      const button = getByRole('button')
      expect(button).toBeTruthy()
    })
    it('should show accessibilityLabel if passed', () => {
      const accessibilityLabel = faker.lorem.words()
      const title = faker.lorem.words()
      const onPressMock = jest.fn()
      const { getByLabelText } = render(
        <Button
          title={title}
          onPress={onPressMock}
          accessibilityLabel={accessibilityLabel}
        />,
      )
      const button = getByLabelText(accessibilityLabel)
      expect(button).toBeTruthy()
    })
  })
})
