import { Bcrypt } from "@/data/protocols/cryptography/bcrypt";
import { faker } from "@faker-js/faker";

export class BcryptMock implements Bcrypt {
  public isValid = true;
  public response = faker.lorem.words();
  async compare(): Promise<boolean> {
    return this.isValid;
  }
  async hash(): Promise<string> {
    return this.response;
  }
}
export const makeBcryptMock = () => {
  const bcryptMock = new BcryptMock();
  return { bcryptMock };
};
