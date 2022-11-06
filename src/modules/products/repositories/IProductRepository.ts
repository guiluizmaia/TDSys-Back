import { Product } from "../infra/typeorm/entities/Product";

export interface ProductDtos {
    name: string;
    uM: string;
    qntd: number;
    amount: number;
    providerId: string;
    propertyId: string;
}

export interface IProductRepository {
    searchByName(name: String): Promise<Product[]>;
    searchByNameAndPropertyId(name: String, id: string): Promise<Product[]>
    findById(id: String): Promise<Product | undefined>;
    findByPropertyId(id: String): Promise<Product[]>;
    create(product: ProductDtos): Promise<Product>;
    save(product: Product): Promise<Product>;
    index(skip?: number, take?: number): Promise<Product[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
}