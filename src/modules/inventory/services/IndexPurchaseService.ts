import INumeric from "src/infra/utils/Numerics/INumeric";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Purchase, Purchase_product } from "../infra/typeorm/entities/Purchase";
import { IPurchaseRepository, purchaseDto, purchaseProductDto } from "../repositories/IPurchaseRepository";

interface IRequest {
    page: number;
    quant?: number;
  }

interface PurchaseComplete extends Purchase {
    product: Purchase_product[]
}

interface IResponse {
    result: PurchaseComplete[],
    page: number,
    lastPage: number
  }

@injectable()
class IndexPurchaseService {
    constructor(
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
        @inject('Numeric')
        private numeric: INumeric,
      ) {}

    public async execute({ page, quant = 10 }: IRequest): Promise<IResponse> {
        const count = await this.purchaseRepository.count()
        let lastPage = count / quant

        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))

        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const purchases = await this.purchaseRepository.index(pageFind * quant, quant);
  
        const result: any[] = [];

        await Promise.all(
            purchases.map(async purchase => {
                const productsInput = await this.purchaseRepository.findProductByPurchaseId(purchase.id)
                
                result.push({
                    ...purchase,
                    product: productsInput
                })
            })
        )

        return {
            result,
            lastPage,
            page
        }
    }
}

export default IndexPurchaseService