import AppError from "src/infra/http/errors/AppError";
import { IApplicationRepository } from "src/modules/inventory/repositories/IApplicationRepository";
import { IPurchaseRepository } from "src/modules/inventory/repositories/IPurchaseRepository";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { ITalhaoRepository } from "src/modules/talhao/repositories/ITalhaoRepository";
import { inject, injectable } from "tsyringe";
import { IPropertiesRepository } from "../repositories/IPropertiesRepository";

interface IRequest {
    id: string
}

@injectable()
class DeletePropertyService {
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
        @inject('TalhaoRepository')
        private talhaoRepository: ITalhaoRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
      ) {}

    public async execute({id}: IRequest): Promise<void> {
      const find = await this.repository.findById(id);
      
      if(!find) throw new AppError('Property not found', 404);

      const purchases = await this.purchaseRepository.findByPropertyId(find.id);

      if(purchases.length > 0){
        await Promise.all(
          purchases.map(async purchase => {
            await this.purchaseRepository.delete(purchase.id)
          })
        )
      }

      const talhoes = await this.talhaoRepository.findByPropertyId(find.id);

      if (talhoes.length > 0){
        await Promise.all(
          talhoes.map(async talhao => {
            talhao.active = false
            await this.talhaoRepository.save(talhao)
            const applications = await this.applicationRepository.findProductByTalhaoId(find.id)
            if(applications.length > 0){
              await Promise.all(
                applications.map(async application => {
                  await this.applicationRepository.delete(application.id)
                })
              )
            }
          })
        )
      }

      const products = await this.productRepository.findByPropertyId(find.id);
      if (products.length > 0){
        await Promise.all(
          products.map(async product => {
            await this.productRepository.delete(product.id)
          })
        )
      }


      await this.repository.save({...find, active: false});
    }
}

export default DeletePropertyService