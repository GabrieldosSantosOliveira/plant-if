/* eslint-disable @typescript-eslint/no-var-requires */
jest.mock(
  'react-native-fbsdk-next',
  () => require('react-native-fbsdk-next/jest/mocks').default,
)
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}))
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')
