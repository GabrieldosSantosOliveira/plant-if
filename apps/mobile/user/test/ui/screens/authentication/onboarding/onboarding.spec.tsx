import { fireEvent, render, screen } from '@/jest/test-utils';
import {
  mockGoBack,
  mockNavigate,
} from '@/test/ui/mocks/navigation/react-navigation-native-mock';
import { Onboarding } from '@/ui/screens/authentication/onboarding/onboarding';
describe('<Onboarding />', () => {
  afterEach(() => {
    mockGoBack.mockClear();
    mockNavigate.mockClear();
  });
  it('should navigate to screen Login on user press button', async () => {
    render(<Onboarding />);
    const button = screen.getByTestId('button-next', { exact: false });
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('login');
  });
  describe('accessibility', () => {
    it('should has accessibilityHint in Button', () => {
      render(<Onboarding />);
      const button = screen.getByTestId('button-next', { exact: false });
      expect(button).toHaveProp('accessibilityHint');
    });
  });
});
