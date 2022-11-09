import AppError from "src/infra/http/errors/AppError";
import { IApplicationRepository } from "src/modules/inventory/repositories/IApplicationRepository";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { IPropertiesRepository } from "src/modules/properties/repositories/IPropertiesRepository";
import IProviderRepository from "src/modules/providers/repositories/IProviderRepository";
import { inject, injectable } from "tsyringe";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest {
    talhaoIds: string[];
}

@injectable()
class TalhaoReportService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
        @inject('TalhaoRepository')
        private talhaoRepository: ITalhaoRepository,
      ) {}

    public async execute({talhaoIds}: IRequest): Promise<any> {
        const ret: any = [];
        
        await Promise.all(
            talhaoIds.map(async talhaoId => {
                const talhao = await this.talhaoRepository.findById(talhaoId)
                const application = await this.applicationRepository.findProductByTalhaoId(talhaoId)
                const retProp: any = [];
                await Promise.all(
                    application.map(async a => {
                        const product = await this.productRepository.findById(a.productId)
                        if (product) {
                            retProp.push({
                            ...a,
                            product: product
                        })}
                    })
                )

                ret.push({
                    talhao: talhao,
                    applications: retProp
                })
            })
        )

        return ret
    }
}

export default TalhaoReportService