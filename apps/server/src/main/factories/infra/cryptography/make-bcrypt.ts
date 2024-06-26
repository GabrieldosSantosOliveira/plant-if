import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter";

export const makeBcrypt = () => new BcryptAdapter(12);
