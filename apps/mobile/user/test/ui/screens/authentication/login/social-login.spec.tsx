import { fireEvent, render, screen } from '@/jest/test-utils';
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
  render(
    <SocialLogin
      authWithGoogleUseCase={authWithGoogleUseCaseMock}
      authWithFacebookUseCase={authWithFacebookUseCaseMock}
    />,
  );
  return {
    authWithFacebookUseCaseMock,
    authWithGoogleUseCaseMock,
  };
};
describe('<SocialLogin />', () => {
  it('should auth with google if user press button sing in with google', async () => {
    makeSut();
    const buttonSingInWithGoogle = screen.getByTestId(
      'button-sing-in-with-google',
    );
    fireEvent.press(buttonSingInWithGoogle);
    expect(mockAuthWithGoogle).toHaveBeenCalled();
  });
  it('should auth with facebook if user press button sing in with facebook', async () => {
    makeSut();
    const buttonSingInWithFacebook = screen.getByTestId(
      'button-sing-in-with-facebook',
    );
    fireEvent.press(buttonSingInWithFacebook);

    expect(mockAuthWithFacebook).toHaveBeenCalled();
  });
});
