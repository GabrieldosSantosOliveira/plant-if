import { LoadUserByIdRepository } from "../../../domain/contracts/repositories/user/load-user-by-id-repository";
import { UserNotFoundException } from "../../../domain/use-cases/errors/user-not-found-exception";
import { ReadUserUseCase } from "../../../domain/use-cases/user/read-user-use-case";

export class ReadUserUseCaseImpl implements ReadUserUseCase {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
  ) {}

  async handle({
    id,
  }: ReadUserUseCase.Params): Promise<ReadUserUseCase.Response> {
    const user = await this.loadUserByIdRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
