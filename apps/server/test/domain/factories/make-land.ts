import { Land, LandProps } from "../../../src/domain/entities/land";
import { mockValues } from "../../mock/mock-values";

export const makeLand = (land: Partial<LandProps> = {}) => {
  return new Land({
    name: mockValues.slug,
    id: mockValues.uuid,
    ...land,
  });
};
