// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/no-unnecessary-act': 'off',
      },
    },
  ],
  extends: [
    'expo',
    'prettier',
    '@react-native-community',
    'plugin:react-native-a11y/all',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
};
