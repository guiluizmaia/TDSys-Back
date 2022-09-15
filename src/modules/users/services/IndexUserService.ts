import INumeric from "src/infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { User } from "../infra/typeorm/entities/User";
import IUserRepository, { UserDtos } from "../repositories/IUserRepository";

interface IRequest {
  page: number;
  quant?: number;
}

interface IResponse {
  result: User[],
  page: number,
  lastPage: number
}

@injectable()
class IndexUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('Numeric')
        private numeric: INumeric,
      ) {}

    public async execute({ page, quant = 10 }: IRequest): Promise<IResponse> { 
      const count = await this.userRepository.count()
      let lastPage = count / quant
      
      if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))

      let pageFind = 0
      if (page !== 0) pageFind = page - 1
      const result = await this.userRepository.index(pageFind * quant, quant);

      return {
        result,
        lastPage,
        page
      }
    }
}

export default IndexUserService