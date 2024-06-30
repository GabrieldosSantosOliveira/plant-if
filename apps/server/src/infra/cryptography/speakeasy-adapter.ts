import * as speakeasy from "speakeasy";
import { TimeBasedOnTimePassword } from "../../data/protocols/cryptography/time-based-one-time-password";
export class SpeakeasyAdapter implements TimeBasedOnTimePassword {
  async generateSecret(): Promise<string> {
    return speakeasy.generateSecret().base32;
  }

  async generatePassword(secret: string, duration: number): Promise<string> {
    return speakeasy.totp({
      secret,
      encoding: "base32",
      step: duration,
    });
  }

  async verify(
    secret: string,
    password: string,
    duration: number,
  ): Promise<boolean> {
    return speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token: password,
      step: duration,
    });
  }
}
