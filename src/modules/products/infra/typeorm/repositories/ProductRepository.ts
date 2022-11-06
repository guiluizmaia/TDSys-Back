import { IProductRepository, ProductDtos } from "src/modules/products/repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

class ProductRepository implements IProductRepository{
    private repository: Repository<Product>;

    constructor(){
        this.repository = getRepository(Product);
    }
    async findByPropertyId(id: String): Promise<Product[]> {
        return this.repository.find({where: {propertyId: id}});
    }

    async searchByNameAndPropertyId(name: String, id: string): Promise<Product[]> {
        return this.repository.createQueryBuilder()
            .select()
            .where('name ILIKE :searchTerm', {searchTerm: `%${name}%`})
            .andWhere('"propertyId" = :id', {id})
            .getMany()
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
        product.name = product.name.trim()
        const create = this.repository.create(product);
        return this.repository.save(create);
    }

    async save({provider, ...product}: Product): Promise<Product> {
        if(product.name)
            product.name = product.name.trim();
       
        await this.repository.save(product);
        return this.repository.findOne({where: {id: product.id}})

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

