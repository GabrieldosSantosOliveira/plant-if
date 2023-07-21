import { render, fireEvent } from '@/jest/test-utils'
import { Button } from '@/ui/screens/Authentication/Onboarding/Button'
import { faker } from '@faker-js/faker'

describe('<Button />', () => {
  it('should render with correct title', () => {
    const title = faker.person.bio()
    const { getByText } = render(<Button title={title} onPress={jest.fn()} />)
    expect(getByText(title)).toBeTruthy()
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
      const title = faker.person.bio()
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
