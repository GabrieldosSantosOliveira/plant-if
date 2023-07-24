import { faker } from '@faker-js/faker'

export class Faker {
  public get internet() {
    return new FakerInternet()
  }

  public get lorem() {
    return new FakerLorem()
  }

  public get person() {
    return new FakerPerson()
  }

  public get string() {
    return new FakerString()
  }
}
export class FakerString {
  public uuid() {
    return faker.string.uuid()
  }
}
export class FakerInternet {
  public email() {
    return faker.internet.email()
  }
}
export class FakerPerson {
  public firstName() {
    return faker.person.firstName()
  }

  public lastName() {
    return faker.person.lastName()
  }

  public bio() {
    return faker.person.bio()
  }
}

export class FakerLorem {
  public words() {
    return faker.lorem.words()
  }
}
export const makeFaker = () => {
  return { faker: new Faker() }
}
