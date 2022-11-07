import { IProductRepository } from "src/modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { Application } from "../infra/typeorm/entities/Application";
import { applicationDto, IApplicationRepository } from "../repositories/IApplicationRepository";



@injectable()
class CreateApplicationService {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('ApplicationRepository')
        private applicationRepository: IApplicationRepository,
      ) {}

    public async execute(applications: applicationDto[]): Promise<Application[]> {
        const ret:Application[] = []
        await Promise.all(
            applications.map(async application => {
                const product = await this.productRepository.findById(application.productId)
                if (product) {
                    product.qntd = Number(product.qntd) - Number(application.qntd);
                    await this.productRepository.save(product)
                    const app = await this.applicationRepository.create(application)
                    ret.push(app)
                }
            }) 
        )

        return ret
    }
}

export default CreateApplicationService