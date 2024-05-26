import { GeneratorUUIDImpl } from "@/infra/gateways/uuid/generator-uuid-impl";

export const makeGeneratorUUID = () => {
  return new GeneratorUUIDImpl();
};
