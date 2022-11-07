import AppError from "src/infra/http/errors/AppError";
import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Application } from "../infra/typeorm/entities/Application";
import { applicationDto, IApplicationRepository } from "../repositories/IApplicationRepository";

@injectable()
class DeleteApplicationService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
      ) {}

    public async execute(id: string): Promise<void> {
        const applicationFind = await this.applicationRepository.findById(id);

        if (!applicationFind) throw new AppError('Application not found', 404)

        const product = await this.productRepository.findById(applicationFind.productId);

        if (!product) throw new AppError('Product not found', 404)

        product.qntd = Number(applicationFind.qntd) + Number(product.qntd);
        
        await this.productRepository.save(product);

        await this.applicationRepository.delete(id);
    }
}

export default DeleteApplicationService