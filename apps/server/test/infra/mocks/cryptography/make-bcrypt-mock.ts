import { Bcrypt } from "../../../../src/data/protocols/cryptography/bcrypt";
import { mockValues } from "../../../mock/mock-values";

export class BcryptMock implements Bcrypt {
  public isValid = true;
  public response = mockValues.slug;
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
