import { Application } from "../infra/typeorm/entities/Application";

export interface applicationDto {
    productId: string;
    qntd: Number;
    talhaoId: Number;
    applicationDate: Date;
}

export interface IApplicationRepository { 
    create(application: applicationDto): Promise<Application>;
    save(application: Application): Promise<Application>;
    index(skip?: number, take?: number): Promise<Application[]>;
    count(): Promise<number>;
    findProductByProductId(id: string): Promise<Application[]>;
    findProductByTalhaoId(id: string): Promise<Application[]>;
    findById(id: string): Promise<Application | undefined>;
    delete(id: string): Promise<void>;
}