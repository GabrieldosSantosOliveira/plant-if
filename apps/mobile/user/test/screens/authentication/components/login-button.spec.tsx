import { render, fireEvent } from '@/jest/test-utils'
import { makeFaker } from '@/test/mock/faker'
import { View } from '@/ui/components/shared/view'
import { LoginButton } from '@/ui/screens/authentication/components/login-button'
import React from 'react'
const { faker } = makeFaker()
describe('<LoginButton />', () => {
  it('should render with correct title', () => {
    const title = faker.person.bio()
    const icon = <View />
    const { getByText } = render(
      <LoginButton title={title} icon={icon} onPress={jest.fn()} />,
    )
    expect(getByText(title)).toBeTruthy()
  })
  it('should render with correct icon', () => {
    const title = faker.person.bio()
    const icon = <View testID="icon" />
    const { getByTestId } = render(
      <LoginButton title={title} icon={icon} onPress={jest.fn()} />,
    )
    expect(getByTestId('icon')).toBeTruthy()
  })
  it('should call onPress on user press', () => {
    const title = faker.person.bio()
    const icon = <View />
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <LoginButton title={title} icon={icon} onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId('id-button'))
    expect(onPressMock).toHaveBeenCalled()
  })

  it('should disable button on press button', () => {
    const title = faker.person.bio()
    const icon = <View />
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <LoginButton
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
      <LoginButton
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
        <LoginButton
          title={title}
          icon={icon}
          onPress={onPressMock}
          isLoading={true}
        />,
      )
      const button = getByRole('button')
      expect(button).toBeTruthy()
    })
    it('should show accessibilityLabel if passed', () => {
      const accessibilityLabel = faker.lorem.words()
      const title = faker.lorem.words()
      const onPressMock = jest.fn()
      const { getByLabelText } = render(
        <LoginButton
          icon={<View />}
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
