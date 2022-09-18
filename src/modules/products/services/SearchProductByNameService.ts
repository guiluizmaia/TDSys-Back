import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductRepository, ProductDtos } from "../repositories/IProductRepository";

interface IRequest {
    name: string;
}

@injectable()
class SearchProductByNameService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({name}: IRequest): Promise<Product[]> {
        return this.productRepository.searchByName(name);
    }
}

export default SearchProductByNameService