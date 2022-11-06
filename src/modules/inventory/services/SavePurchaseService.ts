import AppError from "src/infra/http/errors/AppError";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Purchase, Purchase_product } from "../infra/typeorm/entities/Purchase";
import { IPurchaseRepository, purchaseDto, purchaseProductDto } from "../repositories/IPurchaseRepository";

interface IRequest extends Purchase {
    product: Purchase_product[]
}

interface IResponse extends Purchase {
    product: Purchase_product[]
}

@injectable()
class SavePurchaseService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
      ) {}

    public async execute({product, ...data}: IRequest): Promise<IResponse> {
        const purchase = await this.purchaseRepository.findById(data.id);

        if(!purchase) throw new AppError('Purchase not found', 404);

        Object.assign(purchase, data);
        
        await this.purchaseRepository.save(purchase);

        const productsInput = await this.purchaseRepository.findProductByPurchaseId(purchase.id);

        await Promise.all(
            productsInput.map(async productLast => {
                const productNew = product.find(prod => prod.productId === productLast.productId);
                const productExistent = await this.productRepository.findById(productLast.productId)

                if(productNew && productExistent) {
                    productExistent.qntd -= Number(productLast.qntd);
                    productExistent.qntd += Number(productNew.qntd);
                    productExistent.amount = Number(productNew.price);
                    await this.productRepository.save(productExistent);
                    await this.purchaseRepository.saveProduct(productNew);
                }
            })
        )

        const productsReturn = await this.purchaseRepository.findProductByPurchaseId(purchase.id);

        return {
            ...purchase,
            product: productsReturn
        }
    }
}

export default SavePurchaseService
