import INumeric from "src/infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { Properties } from "../infra/typeorm/entities/Properties";
import { IPropertiesRepository } from "../repositories/IPropertiesRepository";

interface IRequest {
    page: number;
    quant?: number;
  }
  
interface IResponse {
  result: Properties[],
  page: number,
  lastPage: number
}


@injectable()
class IndexPropertiesService {
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
        @inject('Numeric')
        private numeric: INumeric,
    ) {}

    public async execute({ page, quant = 10 }: IRequest): Promise<IResponse> {
        const count = await this.repository.count()
        let lastPage = count / quant
        
        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))
  
        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const result = await this.repository.index(pageFind * quant, quant);
  
        return {
          result,
          lastPage,
          page
        }
    }
}

export default IndexPropertiesService