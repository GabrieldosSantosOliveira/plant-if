import { TimeBasedOnTimePassword } from "@/data/protocols/cryptography/time-based-one-time-password";
import { faker } from "@faker-js/faker";

export class TimeBasedOnTimePasswordMock implements TimeBasedOnTimePassword {
  secret = faker.lorem.words();
  password = faker.lorem.words();
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
