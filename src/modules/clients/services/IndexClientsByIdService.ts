import INumeric from "src/infra/utils/Numerics/INumeric";
import { inject, injectable } from "tsyringe";
import { Clients } from "../infra/typeorm/entities/Clients";
import { IClientsRepository } from "../repositories/IClientsRepository";

interface IRequest {
    page: number;
    quant?: number;
  }
  
interface IResponse {
  result: Clients[],
  page: number,
  lastPage: number
}


@injectable()
class IndexClientsByIdService{
    constructor(
        @inject('ClientsRepository')
        private repository: IClientsRepository,
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

export default IndexClientsByIdService