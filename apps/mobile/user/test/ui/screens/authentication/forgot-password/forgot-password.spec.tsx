import { act, fireEvent, render } from '@/jest/test-utils';
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
  const sut = render(
    <ForgotPassword forgotPasswordUseCase={forgotPasswordUseCaseMock} />,
  );
  return { sut, forgotPasswordUseCaseMock };
};
describe('<ForgotPassword />', () => {
  afterEach(() => {
    mockUseForgotPassword.mockClear();
  });
  it('should show message if submit without email', async () => {
    const { sut } = makeSut();
    const buttonSubmit = sut.getByTestId('button-submit');
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(sut.queryByText('Informe seu email')).toBeTruthy();
  });
  it('should show message if submit with invalid email', async () => {
    const { sut } = makeSut();
    const invalidEmail = faker.lorem.words();
    const inputEmail = sut.getByTestId('input-email');
    const buttonSubmit = sut.getByTestId('button-submit');
    await act(async () => {
      fireEvent.changeText(inputEmail, invalidEmail);
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(sut.queryByText('Informe um email válido')).toBeTruthy();
  });
  it('should call useForgotPassword with correct params', async () => {
    const { sut } = makeSut();
    const validEmail = faker.internet.email();
    const inputEmail = sut.getByTestId('input-email');
    const buttonSubmit = sut.getByTestId('button-submit');
    await act(async () => {
      fireEvent.changeText(inputEmail, validEmail);
    });
    await act(async () => {
      fireEvent.press(buttonSubmit);
    });
    expect(mockUseForgotPassword).toHaveBeenCalledWith(validEmail);
  });
});
