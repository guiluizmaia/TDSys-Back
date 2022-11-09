import AppError from "src/infra/http/errors/AppError";
import { IApplicationRepository } from "src/modules/inventory/repositories/IApplicationRepository";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { IPropertiesRepository } from "src/modules/properties/repositories/IPropertiesRepository";
import IProviderRepository from "src/modules/providers/repositories/IProviderRepository";
import { inject, injectable } from "tsyringe";
import { IPurchaseRepository } from "../repositories/IPurchaseRepository";

interface IRequest {
    propertyIds: string[];
}

@injectable()
class PurchaseReportService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('PurchaseRepository')
        private purchaseRepository: IPurchaseRepository,
        @inject('PropertiesRepository')
        private propertiesRepository: IPropertiesRepository,
      ) {}

    public async execute({propertyIds}: IRequest): Promise<any> {
        const ret: any = [];
        
        await Promise.all(
            propertyIds.map(async propertyId => {
                const property = await this.propertiesRepository.findById(propertyId)
                const purchase = await this.purchaseRepository.findByPropertyId(propertyId)
                console.log(purchase)

                const retProp: any = [];
                await Promise.all(
                    purchase.map(async a => {
                        const purchaseProduct = await this.purchaseRepository.findProductByPurchaseId(a.id)
                        await Promise.all(
                            purchaseProduct.map(async p => {
                                const product = await this.productRepository.findById(p.productId)
                                retProp.push({
                                    ...p,
                                    productName: product?.name,
                                    providerName: product?.provider.name,
                                    providerCnpj: product?.provider.cnpj
                                })
                            })
                        )
                    })
                )

                ret.push({
                    property: property,
                    products: retProp
                })
            })
        )

        return ret
    }
}

export default PurchaseReportService