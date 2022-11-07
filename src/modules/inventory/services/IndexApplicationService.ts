import AppError from "src/infra/http/errors/AppError";
import INumeric from "src/infra/utils/Numerics/INumeric";
import { Product } from "src/modules/products/infra/typeorm/entities/Product";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Application } from "../infra/typeorm/entities/Application";
import { applicationDto, IApplicationRepository } from "../repositories/IApplicationRepository";

interface IRequest {
    page: number;
    quant?: number;
  }

interface ApplicationComplete extends Application {
    product: Product
}

interface IResponse {
    result: ApplicationComplete[],
    page: number,
    lastPage: number
  }

@injectable()
class IndexApplicationService {
    constructor(
        @inject('Numeric')
        private numeric: INumeric,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({ page, quant = 10 }: IRequest): Promise<IResponse> {
        const count = await this.applicationRepository.count()
        let lastPage = count / quant

        if(this.numeric.isFloat(lastPage)) lastPage = parseInt(String(lastPage + 1))

        let pageFind = 0
        if (page !== 0) pageFind = page - 1
        const applications = await this.applicationRepository.index(pageFind * quant, quant);
  
        const result: any[] = [];

        await Promise.all(
            applications.map(async application => {
                const product = await this.productRepository.findById(application.productId)
                
                result.push({
                    ...application,
                    product
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

export default IndexApplicationService