import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export const MakeNavigationMock = <
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList,
>(
  navigation: Partial<
    Pick<StackScreenProps<ParamList, RouteName>, 'navigation'>['navigation']
  > = {},
): Pick<StackScreenProps<ParamList, RouteName>, 'navigation'> => {
  return {
    navigation: {
      addListener: jest.fn(),
      canGoBack: jest.fn(),
      dispatch: jest.fn(),
      getId: jest.fn(),
      getParent: jest.fn(),
      getState: jest.fn(),
      goBack: jest.fn(),
      isFocused: jest.fn(),
      navigate: jest.fn(),
      pop: jest.fn(),
      popToTop: jest.fn(),
      push: jest.fn(),
      removeListener: jest.fn(),
      replace: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
      setParams: jest.fn(),
      ...navigation,
    },
  };
};
