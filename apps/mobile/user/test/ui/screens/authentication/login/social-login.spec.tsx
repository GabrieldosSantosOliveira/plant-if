import { act, fireEvent, render } from '@/jest/test-utils';
import { makeAuthWithFacebookUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-facebook-use-case-mock';
import { makeAuthWithGoogleUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-google-use-case-mock';
import { SocialLogin } from '@/ui/screens/authentication/login/social-login';
const mockAuthWithGoogle = jest.fn();
const mockAuthWithFacebook = jest.fn();

jest.mock('@/ui/hooks/use-auth-with-google', () => ({
  useAuthWithGoogle: () => ({
    promptAsync: mockAuthWithGoogle,
    isLoading: false,
  }),
}));
jest.mock('@/ui/hooks/use-auth-with-facebook', () => ({
  useAuthWithFacebook: () => ({
    promptAsync: mockAuthWithFacebook,
    isLoading: false,
  }),
}));
const makeSut = () => {
  const { authWithFacebookUseCaseMock } = makeAuthWithFacebookUseCaseMock();
  const { authWithGoogleUseCaseMock } = makeAuthWithGoogleUseCaseMock();
  const sut = render(
    <SocialLogin
      authWithGoogleUseCase={authWithGoogleUseCaseMock}
      authWithFacebookUseCase={authWithFacebookUseCaseMock}
    />,
  );
  return {
    sut,
    authWithFacebookUseCaseMock,
    authWithGoogleUseCaseMock,
  };
};
describe('<SocialLogin />', () => {
  it('should auth with google if user press button sing in with google', async () => {
    const { sut } = makeSut();
    const buttonSingInWithGoogle = sut.getByTestId(
      'button-sing-in-with-google',
    );
    await act(async () => {
      fireEvent.press(buttonSingInWithGoogle);
    });
    expect(mockAuthWithGoogle).toHaveBeenCalled();
  });
  it('should auth with facebook if user press button sing in with facebook', async () => {
    const { sut } = makeSut();
    const buttonSingInWithFacebook = sut.getByTestId(
      'button-sing-in-with-facebook',
    );
    await act(async () => {
      fireEvent.press(buttonSingInWithFacebook);
    });
    expect(mockAuthWithFacebook).toHaveBeenCalled();
  });
});
