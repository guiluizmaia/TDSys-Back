import AppError from "src/infra/http/errors/AppError";
import ICryptHash from "src/infra/utils/CryptHash/ICryptHash";
import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest extends User {}

@injectable()
class UpdateUserService {
    constructor(
        @inject('CryptHash')
        private cryptHash: ICryptHash,
        @inject('UserRepository')
        private userRepository: IUserRepository,
      ) {}

    public async execute({ id, password, email, active, ...user }: IRequest): Promise<User> {
        const userAlreadyExists = await this.userRepository.findById(id);
        
        if (!userAlreadyExists) {
          throw new AppError('User not found!', 404);
        }

        if (password) userAlreadyExists.password = await this.cryptHash.create(password);

        if (email) userAlreadyExists.email = email;

        if(active) userAlreadyExists.active = active;

        Object.assign(userAlreadyExists, {...user})

        return this.userRepository.save(userAlreadyExists)
    }
}

export default UpdateUserService