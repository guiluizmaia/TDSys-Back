import { Clients } from "../infra/typeorm/entities/Clients";

export interface ClientsDtos {
    name: string;
    cnpj: string;
    insc_state: string;
    active: boolean;
    email: string;
}

export interface IClientsRepository {
    searchByName(name: String): Promise<Clients[]>;
    findById(id: String): Promise<Clients | undefined>;
    create(clients: ClientsDtos): Promise<Clients>;
    save(clients: Clients): Promise<Clients>;
    index(skip?: number, take?: number): Promise<Clients[]>;
    count(): Promise<number>;
    delete(id: string): Promise<void>;
}