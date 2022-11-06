import AppError from "src/infra/http/errors/AppError";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { IPurchaseRepository, purchaseDto, purchaseProductDto } from "../repositories/IPurchaseRepository";

@injectable()
class DeletePurchaseService {
    constructor(
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute(id: string): Promise<void> {
        const products = await this.purchaseRepository.findProductByPurchaseId(id);

        await Promise.all(
            products.map(async product => {
                const productExist = await this.productRepository.findById(product.productId)
                if(productExist) {
                    productExist.qntd -= Number(product.qntd);
                    await this.productRepository.save(productExist)
                }
            })
        )
        
        await this.purchaseRepository.delete(id);
    }
}

export default DeletePurchaseService
