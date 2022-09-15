import AppError from "src/infra/http/errors/AppError";
import ICryptHash from "src/infra/utils/CryptHash/ICryptHash";
import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/User";
import IUserRepository, { UserDtos } from "../repositories/IUserRepository";

interface IRequest extends UserDtos {}

@injectable()
class CreateUserService {
    constructor(
        @inject('CryptHash')
        private cryptHash: ICryptHash,
        @inject('UserRepository')
        private userRepository: IUserRepository,
      ) {}

    public async execute({ password, email, active, ...user }: IRequest): Promise<User> {
        const userAlreadyExists = await this.userRepository.findByEmail(email);
        
        if (userAlreadyExists) {
          throw new AppError('User already exists!', 401);
        }

        const passwordHashed = await this.cryptHash.create(password);

        if(!active) active = true;

        return this.userRepository.create({
            email,
            password: passwordHashed,
            active,
            ...user
        })
    }
}

export default CreateUserService