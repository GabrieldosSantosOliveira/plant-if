import {
  Technician,
  TechnicianProps,
} from "../../../src/domain/entities/technician";
import { mockValues } from "../../mock/mock-values";

export const makeTechnician = (technician: Partial<TechnicianProps> = {}) => {
  return new Technician({
    email: mockValues.email,
    firstName: mockValues.firstName,
    lastName: mockValues.lastName,
    image: mockValues.url,
    id: mockValues.uuid,
    ...technician,
  });
};
