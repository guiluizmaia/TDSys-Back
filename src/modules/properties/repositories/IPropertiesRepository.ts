import { Properties } from "../infra/typeorm/entities/Properties";

export interface PropertiesDtos {
    name: string;
    clientId: string;
}

export interface IPropertiesRepository {
    searchByName(name: String): Promise<Properties[]>;
    findById(id: String): Promise<Properties | undefined>;
    create(Properties: PropertiesDtos): Promise<Properties>;
    save(properties: Properties): Promise<Properties>;
    index(skip?: number, take?: number): Promise<Properties[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
}