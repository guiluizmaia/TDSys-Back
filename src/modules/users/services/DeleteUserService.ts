import { inject, injectable } from "tsyringe";
import IUserRepository, { UserDtos } from "../repositories/IUserRepository";

interface IRequest {
  id: string
}

@injectable()
class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
      ) {}

    public async execute({ id }: IRequest): Promise<void> {
        await this.userRepository.delete(id);
    }
}

export default DeleteUserService