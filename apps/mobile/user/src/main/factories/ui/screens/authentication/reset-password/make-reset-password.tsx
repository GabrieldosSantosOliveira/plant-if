import { MakeResetPasswordUseCase } from '@/main/factories/data/use-cases/auth/make-reset-password-use-case';
import { ResetPassword } from '@/ui/screens/authentication/reset-password/reset-password';

export const MakeResetPassword = () => (
  <ResetPassword resetPasswordUseCase={MakeResetPasswordUseCase()} />
);
