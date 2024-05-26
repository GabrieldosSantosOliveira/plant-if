import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter";

export const makeHashComparer = () => new BcryptAdapter(12);
