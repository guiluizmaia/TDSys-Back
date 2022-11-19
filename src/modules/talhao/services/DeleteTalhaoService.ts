import AppError from "src/infra/http/errors/AppError";
import { IApplicationRepository } from "src/modules/inventory/repositories/IApplicationRepository";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { IPropertiesRepository } from "src/modules/properties/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest {
    id: string
}

@injectable()
class DeleteTalhaoService {
    constructor(
        @inject('TalhaoRepository')
        private repository: ITalhaoRepository,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
      ) {}

    public async execute({id}: IRequest): Promise<void> {
      const find = await this.repository.findById(id);
      
      if(!find) throw new AppError('Talhao not found', 404);
      
      const applications = await this.applicationRepository.findProductByTalhaoId(find.id)

      if(applications.length > 0){
        await Promise.all(
          applications.map(async application => {
            await this.applicationRepository.delete(application.id)
          })
        )
      }

      await this.repository.save({...find, active: false});
    }
}

export default DeleteTalhaoService