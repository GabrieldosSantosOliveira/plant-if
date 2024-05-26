import { keys } from '@/constants/keys';
import { SecureStorage } from '@/data/protocols/storage/secure-storage';
import {
  AuthRecoverySessionUseCase,
  AuthRecoverySessionUseCaseResponse,
} from '@/domain/use-cases/auth-recovery-session-use-case';

export class AuthRecoverySessionUseCaseImpl
  implements AuthRecoverySessionUseCase
{
  constructor(private readonly secureStorage: SecureStorage) {}
  async execute(): Promise<AuthRecoverySessionUseCaseResponse | null> {
    const [accessToken, refreshToken] = await Promise.all([
      this.secureStorage.getItem<string>(keys.ACCESS_TOKEN),
      this.secureStorage.getItem<string>(keys.REFRESH_TOKEN),
    ]);
    if (!accessToken || !refreshToken) {
      return null;
    }
    return { accessToken, refreshToken };
  }
}
