import { ParamListBase } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'

export const MakeNavigationRouteMock = <
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList,
>(
  route: Partial<
    Pick<StackScreenProps<ParamList, RouteName>, 'route'>['route']
  > = {},
): Pick<StackScreenProps<ParamList, RouteName>, 'route'> => {
  return {
    route: {
      path: '',
      key: '',
      params: {},
      name: '' as Extract<keyof ParamList, string>,
      ...route,
    },
  }
}
