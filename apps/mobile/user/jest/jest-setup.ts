require('react-native-gesture-handler/jestSetup');

jest.mock(
  'react-native-fbsdk-next',
  () => require('react-native-fbsdk-next/jest/mocks').default,
);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
