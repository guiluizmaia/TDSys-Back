import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductRepository, ProductDtos } from "../repositories/IProductRepository";

interface IRequest {
    id: string;
}

@injectable()
class GetProductByPropertyIdService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({id}: IRequest): Promise<Product[]> {
        const products = await this.productRepository.findByPropertyId(id);

        return products;
    }
}

export default GetProductByPropertyIdService