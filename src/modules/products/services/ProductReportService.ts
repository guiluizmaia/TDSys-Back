import AppError from "src/infra/http/errors/AppError";
import { IPropertiesRepository } from "src/modules/properties/repositories/IPropertiesRepository";
import IProviderRepository from "src/modules/providers/repositories/IProviderRepository";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductRepository, ProductDtos } from "../repositories/IProductRepository";

interface IRequest {
    propertyIds: string[];
}

@injectable()
class ProductReportService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('PropertiesRepository')
        private propertiesRepository: IPropertiesRepository,
      ) {}

    public async execute({propertyIds}: IRequest): Promise<any> {
        const ret: any = [];
        
        await Promise.all(
            propertyIds.map(async propertyId => {
                const products = await this.productRepository.findByPropertyId(propertyId);
                const retProp: any = [];
                products.forEach(p => {
                    const {property, ...prod} = p;
                    retProp.push({
                        ...prod
                    })
                })
                ret.push({
                    property: products[0].property,
                    products: retProp
                })
            })
        )

        return ret
    }
}

export default ProductReportService