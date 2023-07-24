import { ReactNativeMMKVAdapter } from '@/infra/storage/react-native-mmkv-adapter'

import { makeJsonMock } from '../json/make-json-mock'

export const MakeStorageMock = () => new ReactNativeMMKVAdapter(makeJsonMock())
