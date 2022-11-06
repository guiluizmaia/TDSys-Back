import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Purchase, Purchase_product } from "../infra/typeorm/entities/Purchase";
import { IPurchaseRepository, purchaseDto, purchaseProductDto } from "../repositories/IPurchaseRepository";

interface IRequest extends purchaseDto {
    products: purchaseProductDto[]
}

interface IResponse extends Purchase {
    product: Purchase_product[]
}

@injectable()
class CreatePurchaseService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
      ) {}

    public async execute({products, ...data}: IRequest): Promise<IResponse> {
        const purchase = await this.purchaseRepository.create(data);

        await Promise.all(
            products.map(async product => {
                const productExistent = await this.productRepository.findById(product.productId)
                if(productExistent){
                    productExistent.qntd = Number(product.qntd) + Number(productExistent.qntd);
                    productExistent.amount = Number(product.price);

                    await this.productRepository.save(productExistent)

                    await this.purchaseRepository.createProduct({
                        price: product.price,
                        purchaseId: purchase.id,
                        productId: product.productId,
                        qntd: product.qntd
                    })
                }
            })
        )

        const productsInput = await this.purchaseRepository.findProductByPurchaseId(purchase.id)

        return {
            ...purchase,
            product: productsInput
        }
    }
}

export default CreatePurchaseService