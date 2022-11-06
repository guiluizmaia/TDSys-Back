import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Product } from "../infra/typeorm/entities/Product";
import { IProductRepository, ProductDtos } from "../repositories/IProductRepository";

interface IRequest {
    name: string;
    id: string
}

@injectable()
class SearchProductByNameAndPropertyService{
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
      ) {}

    public async execute({name, id}: IRequest): Promise<Product[]> {
        return this.productRepository.searchByNameAndPropertyId(name, id);
    }
}

export default SearchProductByNameAndPropertyService