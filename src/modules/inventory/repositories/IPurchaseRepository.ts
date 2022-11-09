import { Purchase, Purchase_product } from "../infra/typeorm/entities/Purchase";

export interface purchaseDto {
    name: string;
    propertyId: string;
    amount: Number;
    date: Date;
}

export interface purchaseProductDto {
    purchaseId: string;
    productId: string;
    qntd: Number;
    price: Number;
}

export interface IPurchaseRepository { 
    create(purchase: purchaseDto): Promise<Purchase>;
    createProduct(purchase: purchaseProductDto): Promise<Purchase_product>;
    saveProduct(purchase: Purchase_product): Promise<Purchase_product>;
    save(purchase: Purchase): Promise<Purchase>;
    index(skip?: number, take?: number): Promise<Purchase[]>;
    count(): Promise<number>;
    findProductByPurchaseId(id: string): Promise<Purchase_product[]>;
    findById(id: string): Promise<Purchase | undefined>;
    findByPropertyId(id: string): Promise<Purchase[]>;
    delete(id: string): Promise<void>;
}