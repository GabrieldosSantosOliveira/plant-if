import { fireEvent, render, screen } from '@/jest/test-utils';
import { mockGoBack } from '@/test/ui/mocks/navigation/react-navigation-native-mock';
import { Header } from '@/ui/screens/authentication/login/header';
describe('<Header />', () => {
  afterEach(() => {
    mockGoBack.mockClear();
  });
  it('should navigate to prev screen if user press button go back', async () => {
    render(<Header />);
    const buttonGoBack = screen.getByTestId('button-go-back');

    fireEvent.press(buttonGoBack);

    expect(mockGoBack).toHaveBeenCalled();
  });
  describe('accessibility', () => {
    it('should has accessibilityHint into button go back', () => {
      render(<Header />);
      const buttonGoBack = screen.getByTestId('button-go-back');
      expect(buttonGoBack).toHaveProp('accessibilityHint');
    });
  });
});
