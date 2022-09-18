import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductRepository, ProductDtos } from "../repositories/IProductRepository";

interface IRequest {
    id: string;
}

@injectable()
class GetProductByIdService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({id}: IRequest): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if(!product) throw new AppError('Product not found', 404);

        return product;
    }
}

export default GetProductByIdService