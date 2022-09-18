import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductRepository, ProductDtos } from "../repositories/IProductRepository";

interface IRequest extends ProductDtos {}

@injectable()
class CreateProductService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute(data: IRequest): Promise<Product> {
        return this.productRepository.create(data);
    }
}

export default CreateProductService