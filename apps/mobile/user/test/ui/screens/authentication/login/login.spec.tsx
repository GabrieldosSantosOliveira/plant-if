import { act, fireEvent, render, screen } from '@/jest/test-utils';
import { makeAuthWithEmailUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-email-use-case-mock';
import { makeAuthWithFacebookUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-facebook-use-case-mock';
import { makeAuthWithGoogleUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-google-use-case-mock';
import {
  mockGoBack,
  mockNavigate,
} from '@/test/ui/mocks/navigation/react-navigation-native-mock';
import { Login } from '@/ui/screens/authentication/login/login';
import { faker } from '@faker-js/faker';
const mockUseAuthWithEmail = jest.fn();
jest.mock('@/ui/hooks/use-auth-with-email', () => {
  return {
    useAuthWithEmail: () => ({
      execute: mockUseAuthWithEmail,
      isLoading: false,
    }),
  };
});
const makeSut = () => {
  const { authWithEmailUseCaseMock } = makeAuthWithEmailUseCaseMock();
  const { authWithFacebookUseCaseMock } = makeAuthWithFacebookUseCaseMock();
  const { authWithGoogleUseCaseMock } = makeAuthWithGoogleUseCaseMock();
  render(
    <Login
      authWithGoogleUseCase={authWithGoogleUseCaseMock}
      authWithEmailUseCase={authWithEmailUseCaseMock}
      authWithFacebookUseCase={authWithFacebookUseCaseMock}
    />,
  );
  return {
    authWithEmailUseCaseMock,
    authWithFacebookUseCaseMock,
    authWithGoogleUseCaseMock,
  };
};
describe('<Login />', () => {
  afterEach(() => {
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    mockUseAuthWithEmail.mockClear();
  });
  it('should navigate to screen forgot-password if user press button', async () => {
    makeSut();
    const buttonForgotPassword = screen.getByTestId('button-forgot-password');
    fireEvent.press(buttonForgotPassword);
    expect(mockNavigate).toHaveBeenCalledWith('forgot-password');
  });
  it('should navigate to screen sing-up if user press button', async () => {
    makeSut();
    const buttonForgotPassword = screen.getByTestId('button-sing-up');
    fireEvent.press(buttonForgotPassword);
    expect(mockNavigate).toHaveBeenCalledWith('sing-up');
  });
  it('should show message if user submit form with invalid email', async () => {
    makeSut();
    const inputEmail = screen.getByTestId('input-email');
    const buttonSubmit = screen.getByTestId('button-submit');

    await act(async () => {
      fireEvent.changeText(inputEmail, 'invalid_email');
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(screen.getByText('Informe um email válido')).toBeTruthy();
  });
  it('should show message if user submit form without email', async () => {
    makeSut();
    const buttonSubmit = screen.getByTestId('button-submit');

    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(screen.getByText('Informe seu email')).toBeTruthy();
  });
  it('should show message if user submit form with password less 4 characters', async () => {
    makeSut();
    const buttonSubmit = screen.getByTestId('button-submit');
    const inputPassword = screen.getByTestId('input-password');
    await act(async () => {
      fireEvent.changeText(inputPassword, 'a'.repeat(3));
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(
      screen.getByText('A senha precisa ter no mínimo 4 caracteres'),
    ).toBeTruthy();
  });
  it('should show message if user submit form without password', async () => {
    makeSut();
    const buttonSubmit = screen.getByTestId('button-submit');

    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(screen.getByText('Informe sua senha')).toBeTruthy();
  });
  it('should call useAuthWithEmail if success', async () => {
    makeSut();
    const buttonSubmit = screen.getByTestId('button-submit');
    const inputPassword = screen.getByTestId('input-password');
    const inputEmail = screen.getByTestId('input-email');
    const validEmail = faker.internet.email();
    const validPassword = faker.internet.password({ length: 30 });
    fireEvent.changeText(inputPassword, validPassword);
    fireEvent.changeText(inputEmail, validEmail);
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(mockUseAuthWithEmail).toHaveBeenCalled();
  });
});
