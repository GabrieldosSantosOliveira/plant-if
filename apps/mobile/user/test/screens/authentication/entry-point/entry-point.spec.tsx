import { act, fireEvent, render } from '@/jest/test-utils'
import { makeAuthWithFacebookUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-facebook-use-case-mock'
import { makeAuthWithGoogleUseCaseMock } from '@/test/data/mocks/use-cases/auth/make-auth-with-google-use-case-mock'
import { makeIsUserAlreadyExistsUseCaseResponse } from '@/test/data/mocks/use-cases/auth/make-is-user-already-exists-use-case-mock'
import { makeFaker } from '@/test/mock/faker'
import { EntryPoint } from '@/ui/screens/authentication/entry-point/entry-point'
const mockIsUserAlreadyExistsExecute = jest.fn()
jest.mock('@/ui/hooks/use-is-user-already-exists', () => {
  return {
    useIsUserAlreadyExists: () => ({
      execute: mockIsUserAlreadyExistsExecute,
      isLoading: false,
    }),
  }
})
const mockAuthWithGooglePromptAsync = jest.fn()
jest.mock('@/ui/hooks/use-auth-with-google', () => {
  return {
    useAuthWithGoogle: () => ({
      promptAsync: mockAuthWithGooglePromptAsync,
      isLoading: false,
    }),
  }
})
const mockAuthWithFacebookPromptAsync = jest.fn()
jest.mock('@/ui/hooks/use-auth-with-facebook', () => {
  return {
    useAuthWithFacebook: () => ({
      promptAsync: mockAuthWithFacebookPromptAsync,
      isLoading: false,
    }),
  }
})
const { faker } = makeFaker()
const makeSut = () => {
  const { authWithFacebookUseCaseMock } = makeAuthWithFacebookUseCaseMock()
  const { authWithGoogleUseCaseMock } = makeAuthWithGoogleUseCaseMock()
  const { isUserAlreadyExistsUseCaseMock } =
    makeIsUserAlreadyExistsUseCaseResponse()
  const sut = render(
    <EntryPoint
      isUserAlreadyExistsUseCase={isUserAlreadyExistsUseCaseMock}
      authWithGoogleUseCase={authWithGoogleUseCaseMock}
      authWithFacebookUseCase={authWithFacebookUseCaseMock}
    />,
  )
  return {
    sut,
    authWithFacebookUseCaseMock,
    authWithGoogleUseCaseMock,
    isUserAlreadyExistsUseCaseMock,
  }
}
describe('<EntryPoint />', () => {
  afterEach(() => {
    mockAuthWithGooglePromptAsync.mockClear()
    mockIsUserAlreadyExistsExecute.mockClear()
  })
  it('should has button sing-in with google', async () => {
    const { sut } = makeSut()
    const buttonLoginGoogle = sut.getByTestId('button-login-google')
    expect(buttonLoginGoogle).toBeTruthy()
  })
  it('should authenticate with google if user press sing-in with google', async () => {
    const { sut } = makeSut()
    const buttonLoginGoogle = sut.getByTestId('button-login-google')
    fireEvent.press(buttonLoginGoogle)

    expect(mockAuthWithGooglePromptAsync).toHaveBeenCalled()
  })
  it('should has button to auth with facebook ', async () => {
    const { sut } = makeSut()
    const buttonLoginFacebook = sut.getByTestId('button-login-facebook')
    fireEvent.press(buttonLoginFacebook)
    expect(buttonLoginFacebook).toBeTruthy()
  })
  it('should authenticate with facebook if user press sing-in with facebook', async () => {
    const { sut } = makeSut()
    const buttonLoginFacebook = sut.getByTestId('button-login-facebook')
    expect(buttonLoginFacebook).toBeTruthy()
  })
  it('should call useIsUserAlreadyExists if email is valid', async () => {
    const { sut } = makeSut()
    const validEmail = faker.internet.email()
    const textInput = sut.getByPlaceholderText('Informe o seu email', {
      exact: false,
    })
    fireEvent.changeText(textInput, validEmail)
    const buttonSubmit = sut.getByTestId('button-submit')
    await act(async () => {
      fireEvent.press(buttonSubmit)
    })
    expect(mockIsUserAlreadyExistsExecute).toHaveBeenCalled()
  })
  it('should not call useIsUserAlreadyExists if email is invalid', async () => {
    const { sut } = makeSut()
    const textInput = sut.getByPlaceholderText('Informe o seu email', {
      exact: false,
    })
    fireEvent.changeText(textInput, 'invalid_email')

    const buttonSubmit = sut.getByTestId('button-submit')
    await act(async () => {
      fireEvent.press(buttonSubmit)
    })
    expect(mockIsUserAlreadyExistsExecute).not.toHaveBeenCalled()
  })

  it('should show message if invalid email is provided', async () => {
    const { sut } = makeSut()
    const invalidEmail = 'invalid_email'
    const textInput = sut.getByPlaceholderText('Informe o seu email', {
      exact: false,
    })
    await act(async () => {
      fireEvent.changeText(textInput, invalidEmail)
    })
    const buttonSubmit = sut.getByTestId('button-submit')
    await act(async () => {
      fireEvent.press(buttonSubmit)
    })

    expect(
      sut.getByText('Informe um email válido', { exact: false }),
    ).toBeTruthy()
  })
  describe('accessibility', () => {
    it('button sing-in with google should has accessibilityHint', () => {
      const { sut } = makeSut()
      const buttonLoginGoogle = sut.getByTestId('button-login-google')

      expect(buttonLoginGoogle).toHaveProp('accessibilityHint')
    })

    it('button sing-in with facebook should has accessibilityHint', () => {
      const { sut } = makeSut()
      const buttonSingInWithFacebook = sut.getByTestId('button-login-facebook')

      expect(buttonSingInWithFacebook).toHaveProp('accessibilityHint')
    })

    it('button submit should has accessibilityHint', () => {
      const { sut } = makeSut()
      const buttonSubmit = sut.getByTestId('button-submit')

      expect(buttonSubmit).toHaveProp('accessibilityHint')
    })
  })
})
