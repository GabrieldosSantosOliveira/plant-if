import { render, fireEvent } from '@/jest/test-utils';
import { makeFaker } from '@/test/mock/faker';
import { Box } from '@/ui/components/shared/box';
import { LoginButton } from '@/ui/screens/authentication/components/login-button';
const { faker } = makeFaker();
describe('<LoginButton />', () => {
  it('should render with correct icon', () => {
    const icon = <Box testID="icon" />;
    const { getByTestId } = render(
      <LoginButton icon={icon} onPress={jest.fn()} />,
    );
    expect(getByTestId('icon')).toBeTruthy();
  });
  it('should call onPress on user press', () => {
    const icon = <Box />;
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <LoginButton icon={icon} onPress={onPressMock} />,
    );
    fireEvent.press(getByTestId('id-button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('should disable button on press button', () => {
    const icon = <Box />;
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <LoginButton icon={icon} onPress={onPressMock} isLoading={true} />,
    );
    expect(getByTestId('id-button')).toBeDisabled();
  });
  it('should show spinner if button isLoading', () => {
    const icon = <Box />;
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <LoginButton icon={icon} onPress={onPressMock} isLoading={true} />,
    );
    expect(getByTestId('spinner')).toBeTruthy();
  });
  describe('accessibility', () => {
    it('should be role button', () => {
      const icon = <Box />;
      const onPressMock = jest.fn();
      const { getByRole } = render(
        <LoginButton icon={icon} onPress={onPressMock} isLoading={true} />,
      );
      const button = getByRole('button');
      expect(button).toBeTruthy();
    });
    it('should show accessibilityHint if passed', () => {
      const accessibilityHint = faker.lorem.words();
      const onPressMock = jest.fn();
      const { getAllByHintText } = render(
        <LoginButton
          icon={<Box />}
          onPress={onPressMock}
          accessibilityHint={accessibilityHint}
        />,
      );
      const button = getAllByHintText(accessibilityHint);
      expect(button).toBeTruthy();
    });
  });
});
