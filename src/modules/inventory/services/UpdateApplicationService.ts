import AppError from "src/infra/http/errors/AppError";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Application } from "../infra/typeorm/entities/Application";
import { applicationDto, IApplicationRepository } from "../repositories/IApplicationRepository";

@injectable()
class UpdateApplicationService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
      ) {}

    public async execute(application: Application): Promise<Application> {
        const applicationFind = await this.applicationRepository.findById(application.id);

        if (!applicationFind) throw new AppError('Application not found', 404)

        const product = await this.productRepository.findById(application.productId);

        if (!product) throw new AppError('Product not found', 404)

        product.qntd = Number(applicationFind.qntd) + Number(product.qntd);
        product.qntd = Number(product.qntd) - Number(application.qntd);

        await this.productRepository.save(product)

        Object.assign(applicationFind, application)

        return this.applicationRepository.save(applicationFind)        
    }
}

export default UpdateApplicationService