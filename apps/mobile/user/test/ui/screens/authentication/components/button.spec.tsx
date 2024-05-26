import { render, fireEvent, screen } from '@/jest/test-utils';
import { makeFaker } from '@/test/mock/faker';
import { Button } from '@/ui/screens/authentication/components/button';
const { faker } = makeFaker();
describe('<Button />', () => {
  it('should render with correct title', () => {
    const title = faker.lorem.words();
    render(<Button title={title} onPress={jest.fn()} />);
    expect(screen.getByText(title)).toBeTruthy();
  });
  it('should show spinner if isLoading is true', () => {
    const title = faker.person.bio();
    render(<Button title={title} onPress={jest.fn()} isLoading />);
    const activityIndicator = screen.getByTestId('activity-indicator');
    expect(activityIndicator).toBeTruthy();
  });
  it('should not show spinner if isLoading is false', () => {
    const title = faker.person.bio();
    render(<Button title={title} onPress={jest.fn()} isLoading={false} />);
    const activityIndicator = screen.queryByTestId('activity-indicator');
    expect(activityIndicator).toBeFalsy();
  });

  it('should call onPress on user press', () => {
    const title = faker.person.bio();
    const onPressMock = jest.fn();
    render(<Button title={title} onPress={onPressMock} />);
    fireEvent.press(screen.getByTestId('id-button'));
    expect(onPressMock).toHaveBeenCalled();
  });

  describe('accessibility', () => {
    it('should be role button', () => {
      const title = faker.person.bio();
      const onPressMock = jest.fn();
      render(<Button title={title} onPress={onPressMock} />);
      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });
    it('should show accessibilityHint if passed', () => {
      const accessibilityHint = faker.lorem.words();
      const title = faker.lorem.words();
      const onPressMock = jest.fn();
      render(
        <Button
          title={title}
          onPress={onPressMock}
          accessibilityHint={accessibilityHint}
        />,
      );
      const button = screen.getAllByHintText(accessibilityHint);
      expect(button).toBeTruthy();
    });
  });
});
