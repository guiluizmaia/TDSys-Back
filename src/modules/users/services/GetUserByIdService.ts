import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/User";
import IUserRepository, { UserDtos } from "../repositories/IUserRepository";

interface IRequest {
  id: string
}

@injectable()
class GetUserByIdService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
      ) {}

    public async execute({ id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
          throw new AppError('User not found!', 404);
        }

        return user;
    }
}

export default GetUserByIdService