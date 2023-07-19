import { Technician, TechnicianProps } from '@/app/entities/technician'
import { faker } from '@faker-js/faker'

export const makeTechnician = (technician: Partial<TechnicianProps> = {}) => {
  return new Technician({
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    image: faker.internet.avatar(),
    id: faker.string.uuid(),
    ...technician,
  })
}
