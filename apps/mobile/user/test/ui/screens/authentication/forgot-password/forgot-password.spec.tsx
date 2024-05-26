import { act, fireEvent, render, screen } from '@/jest/test-utils';
import { makeForgotPasswordUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-forgot-password-use-case';
import { ForgotPassword } from '@/ui/screens/authentication/forgot-password/forgot-password';
import { faker } from '@faker-js/faker';

const mockUseForgotPassword = jest.fn();

jest.mock(
  '@/ui/screens/authentication/forgot-password/use-forgot-password',
  () => {
    return {
      useForgotPassword: () => ({
        execute: mockUseForgotPassword,
        isLoading: false,
      }),
    };
  },
);
const makeSut = () => {
  const { forgotPasswordUseCaseMock } = makeForgotPasswordUseCaseMock();
  render(<ForgotPassword forgotPasswordUseCase={forgotPasswordUseCaseMock} />);
  return { forgotPasswordUseCaseMock };
};
describe('<ForgotPassword />', () => {
  afterEach(() => {
    mockUseForgotPassword.mockClear();
  });
  it('should show message if submit without email', async () => {
    makeSut();
    const buttonSubmit = screen.getByTestId('button-submit');
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(screen.getByText('Informe seu email')).toBeTruthy();
  });
  it('should show message if submit with invalid email', async () => {
    makeSut();
    const invalidEmail = faker.lorem.words();
    const inputEmail = screen.getByTestId('input-email');
    const buttonSubmit = screen.getByTestId('button-submit');
    await act(async () => {
      fireEvent.changeText(inputEmail, invalidEmail);
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(screen.getByText('Informe um email válido')).toBeTruthy();
  });
  it('should call useForgotPassword with correct params', async () => {
    makeSut();
    const validEmail = faker.internet.email();
    const inputEmail = screen.getByTestId('input-email');
    const buttonSubmit = screen.getByTestId('button-submit');
    fireEvent.changeText(inputEmail, validEmail);
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(mockUseForgotPassword).toHaveBeenCalledWith(validEmail);
  });
});
