import { render, fireEvent } from '@/jest/test-utils'
import { View } from '@/ui/components/shared/View'
import { Button } from '@/ui/screens/Dashboard/components/Button'
import { faker } from '@faker-js/faker'
describe('<Button />', () => {
  it('should render with correct title', () => {
    const title = faker.person.bio()
    const icon = <View />
    const { getByText } = render(
      <Button title={title} icon={icon} onPress={jest.fn()} />,
    )
    expect(getByText(title)).toBeTruthy()
  })
  it('should render with correct icon', () => {
    const title = faker.person.bio()
    const icon = <View testID="icon" />
    const { getByTestId } = render(
      <Button title={title} icon={icon} onPress={jest.fn()} />,
    )
    expect(getByTestId('icon')).toBeTruthy()
  })
  it('should call onPress on user press', () => {
    const title = faker.person.bio()
    const icon = <View />
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Button title={title} icon={icon} onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId('id-button'))
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should disable button on press button', () => {
    const title = faker.person.bio()
    const icon = <View />
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Button
        title={title}
        icon={icon}
        onPress={onPressMock}
        isLoading={true}
      />,
    )
    expect(getByTestId('id-button')).toBeDisabled()
  })
  it('should show spinner if button isLoading', () => {
    const title = faker.person.bio()
    const icon = <View />
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <Button
        title={title}
        icon={icon}
        onPress={onPressMock}
        isLoading={true}
      />,
    )
    expect(getByTestId('spinner')).toBeTruthy()
  })
  describe('accessibility', () => {
    it('should be role button', () => {
      const title = faker.person.bio()
      const icon = <View />
      const onPressMock = jest.fn()
      const { getByRole } = render(
        <Button
          title={title}
          icon={icon}
          onPress={onPressMock}
          isLoading={true}
        />,
      )
      const button = getByRole('button')
      expect(button).toBeTruthy()
    })
  })
})
