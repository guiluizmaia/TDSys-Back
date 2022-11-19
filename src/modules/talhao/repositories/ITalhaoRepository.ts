import { Talhao } from "../infra/typeorm/entities/Talhao";

export interface TalhaoDtos {
    name: string;
    propertyId: string;
}

export interface ITalhaoRepository {
    searchByName(name: String): Promise<Talhao[]>;
    findById(id: String): Promise<Talhao | undefined>;
    findByPropertyId(id: String): Promise<Talhao[]>;
    create(talhao: TalhaoDtos): Promise<Talhao>;
    save(talhao: Talhao): Promise<Talhao>;
    index(skip?: number, take?: number): Promise<Talhao[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
}