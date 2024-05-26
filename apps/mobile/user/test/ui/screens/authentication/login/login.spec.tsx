import { act, fireEvent, render } from '@/jest/test-utils';
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
  const sut = render(
    <Login
      authWithGoogleUseCase={authWithGoogleUseCaseMock}
      authWithEmailUseCase={authWithEmailUseCaseMock}
      authWithFacebookUseCase={authWithFacebookUseCaseMock}
    />,
  );
  return {
    sut,
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
    const { sut } = makeSut();
    const buttonForgotPassword = sut.getByTestId('button-forgot-password');
    await act(async () => {
      fireEvent.press(buttonForgotPassword);
    });
    expect(mockNavigate).toHaveBeenCalledWith('forgot-password');
  });
  it('should navigate to screen sing-up if user press button', async () => {
    const { sut } = makeSut();
    const buttonForgotPassword = sut.getByTestId('button-sing-up');
    await act(async () => {
      fireEvent.press(buttonForgotPassword);
    });
    expect(mockNavigate).toHaveBeenCalledWith('sing-up');
  });
  it('should show message if user submit form with invalid email', async () => {
    const { sut } = makeSut();
    const inputEmail = sut.getByTestId('input-email');
    const buttonSubmit = sut.getByTestId('button-submit');

    await act(async () => {
      fireEvent.changeText(inputEmail, 'invalid_email');
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(sut.queryByText('Informe um email válido')).toBeTruthy();
  });
  it('should show message if user submit form without email', async () => {
    const { sut } = makeSut();
    const buttonSubmit = sut.getByTestId('button-submit');

    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(sut.queryByText('Informe seu email')).toBeTruthy();
  });
  it('should show message if user submit form with password less 4 characters', async () => {
    const { sut } = makeSut();
    const buttonSubmit = sut.getByTestId('button-submit');
    const inputPassword = sut.getByTestId('input-password');
    await act(async () => {
      fireEvent.changeText(inputPassword, 'a'.repeat(3));
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(
      sut.queryByText('A senha precisa ter no mínimo 4 caracteres'),
    ).toBeTruthy();
  });
  it('should show message if user submit form without password', async () => {
    const { sut } = makeSut();
    const buttonSubmit = sut.getByTestId('button-submit');

    await act(async () => {
      fireEvent.press(buttonSubmit);
    });

    expect(sut.queryByText('Informe sua senha')).toBeTruthy();
  });
  it('should call useAuthWithEmail if success', async () => {
    const { sut } = makeSut();
    const buttonSubmit = sut.getByTestId('button-submit');
    const inputPassword = sut.getByTestId('input-password');
    const inputEmail = sut.getByTestId('input-email');
    const validEmail = faker.internet.email();
    const validPassword = faker.internet.password({ length: 30 });
    await act(async () => {
      fireEvent.changeText(inputPassword, validPassword);
    });
    await act(async () => {
      fireEvent.changeText(inputEmail, validEmail);
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(mockUseAuthWithEmail).toHaveBeenCalled();
  });
});
