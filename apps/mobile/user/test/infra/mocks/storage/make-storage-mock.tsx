import { ReactNativeMMKVAdapter } from '@/infra/storage/react-native-mmkv-adapter'

export const MakeStorageMock = () => new ReactNativeMMKVAdapter()
