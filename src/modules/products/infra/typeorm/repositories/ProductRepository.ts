import { IProductRepository, ProductDtos } from "src/modules/products/repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

class ProductRepository implements IProductRepository{
    private repository: Repository<Product>;

    constructor(){
        this.repository = getRepository(Product);
    }

    async searchByName(name: String): Promise<Product[]> {
        return this.repository.createQueryBuilder()
            .select()
            .where('name ILIKE :searchTerm', {searchTerm: `%${name}%`})
            .getMany()
    }

    async findById(id: String): Promise<Product | undefined> {
        return this.repository.findOne({where: {id}})
    }

    async create(product: ProductDtos): Promise<Product> {
        const create = this.repository.create(product);
        return this.repository.save(create);
    }

    async save(product: Product): Promise<Product> {
        return this.repository.save(product);
    }

    async index(skip: number = 0, take: number = 10): Promise<Product[]> {
        return this.repository.find({
            skip,
            take
        })
    }
    
    async count(): Promise<number> {
        return this.repository.count();
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export default ProductRepository

