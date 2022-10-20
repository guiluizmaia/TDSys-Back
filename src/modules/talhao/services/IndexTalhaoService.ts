import INumeric from "src/infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { Talhao } from "../infra/typeorm/entities/Talhao";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest {
    page: number;
    quant?: number;
  }
  
interface IResponse {
  result: Talhao[],
  page: number,
  lastPage: number
}


@injectable()
class IndexTalhaoService {
    constructor(
        @inject('TalhaoRepository')
        private repository: ITalhaoRepository,
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

export default IndexTalhaoService