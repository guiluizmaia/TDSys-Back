import AppError from "src/infra/http/errors/AppError";
import INumeric from "src/infra/utils/Numerics/INumeric";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Purchase, Purchase_product } from "../infra/typeorm/entities/Purchase";
import { IPurchaseRepository, purchaseDto, purchaseProductDto } from "../repositories/IPurchaseRepository";

interface IRequest {
    id: string;
}

interface PurchaseComplete extends Purchase {
    product: Purchase_product[]
}

@injectable()
class FindByIdPurchaseService {
    constructor(
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
      ) {}

    public async execute({ id }: IRequest): Promise<PurchaseComplete> {
        const purchases = await this.purchaseRepository.findById(id);

        if(!purchases) throw new AppError('purchases', 404)

        const productsInput = await this.purchaseRepository.findProductByPurchaseId(purchases.id)
        
        return { 
            ...purchases,
            product: productsInput
        }
    }
}

export default FindByIdPurchaseService