import AppError from "src/infra/http/errors/AppError";
import INumeric from "src/infra/utils/Numerics/INumeric";
import { Product } from "src/modules/products/infra/typeorm/entities/Product";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Application } from "../infra/typeorm/entities/Application";
import { applicationDto, IApplicationRepository } from "../repositories/IApplicationRepository";

interface IRequest {
    type: 'ID' | 'PRODUCTID' | 'TALHAOID';
    id: string;
}


@injectable()
class FindApplicationService {
    constructor(
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({ type, id }: IRequest): Promise<any> {
        if(type === 'ID'){
            const application = await this.applicationRepository.findById(id);
            
            if(!application) throw new AppError('Application not found', 404)
            
            const product = await this.productRepository.findById(application.productId)
            
            if(!product) throw new AppError('Product not found', 404)
            
            return {
                ...application,
                product
            }
        } else if (type === 'PRODUCTID'){
            const applications = await this.applicationRepository.findProductByProductId(id);
            const ret: any[] = []

            await Promise.all(
                applications.map(async application => {
                    const product = await this.productRepository.findById(application.productId)
                    if(product) {
                        ret.push({
                            ...application,
                            product
                        })
                    }
                })
            )
            
            return ret
        } else {
            const applications = await this.applicationRepository.findProductByTalhaoId(id);
            const ret: any[] = []

            await Promise.all(
                applications.map(async application => {
                    const product = await this.productRepository.findById(application.productId)
                    if(product) {
                        ret.push({
                            ...application,
                            product
                        })
                    }
                })
            )
            
            return ret
        }

                
    }
}

export default FindApplicationService