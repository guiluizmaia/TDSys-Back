import { IPurchaseRepository, purchaseDto, purchaseProductDto } from "src/modules/inventory/repositories/IPurchaseRepository";
import { getRepository, Repository } from "typeorm";
import { Purchase, Purchase_product } from "../entities/Purchase";

class PurchaseRepository implements IPurchaseRepository {
    private repository: Repository<Purchase>;
    private repositoryProduct: Repository<Purchase_product>;

    constructor(){
        this.repository = getRepository(Purchase);
        this.repositoryProduct = getRepository(Purchase_product);
    }
    async findByPropertyId(id: string): Promise<Purchase[]> {
        return this.repository.find({where: {propertyId: id}})
    }
    
    async count(): Promise<number> {
        return this.repository.count();
    }

    async delete(id: string): Promise<void> {
        await this.repository.query(`
            DELETE FROM purchase_product p
            WHERE p."purchaseId" = '${id}'
        `)
        
        await this.repository.delete(id);
    }
    
    async saveProduct(purchase: Purchase_product): Promise<Purchase_product> {
        return this.repositoryProduct.save(purchase);
    }
    
    async create(purchase: purchaseDto): Promise<Purchase> {
        const create = this.repository.create(purchase);
        return this.repository.save(create)
    }

    async createProduct(purchase: purchaseProductDto): Promise<Purchase_product> {
        const create = this.repositoryProduct.create(purchase);
        return this.repositoryProduct.save(create)
    }

    async save(purchase: Purchase): Promise<Purchase> {
        return this.repository.save(purchase);
    }

    async index(skip?: number | undefined, take?: number | undefined): Promise<Purchase[]> {
        return this.repository.find({
            skip,
            take
        })
    }
    
    async findProductByPurchaseId(id: string): Promise<Purchase_product[]> {
        return this.repositoryProduct.find({where: {purchaseId: id}})
    }

    async findById(id: string): Promise<Purchase | undefined> {
        return this.repository.findOne(id);
    }
}

export default PurchaseRepository;