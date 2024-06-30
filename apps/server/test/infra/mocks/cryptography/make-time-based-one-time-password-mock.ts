import { TimeBasedOnTimePassword } from "../../../../src/data/protocols/cryptography/time-based-one-time-password";
import { mockValues } from "../../../mock/mock-values";

export class TimeBasedOnTimePasswordMock implements TimeBasedOnTimePassword {
  secret = mockValues.slug;
  password = mockValues.slug;
  isValid = true;
  async generateSecret(): Promise<string> {
    return this.secret;
  }

  async generatePassword(): Promise<string> {
    return this.password;
  }

  async verify(): Promise<boolean> {
    return this.isValid;
  }
}
export const makeTimeBasedOnTimePasswordMock = () => {
  const timeBasedOnTimePasswordMock = new TimeBasedOnTimePasswordMock();
  return { timeBasedOnTimePasswordMock };
};
