import { ReactNativeMMKVAdapter } from '@/infra/storage/react-native-mmkv-adapter';

import { MakeJson } from '../json/make-json';

export const MakeStorage = () => new ReactNativeMMKVAdapter(MakeJson());
