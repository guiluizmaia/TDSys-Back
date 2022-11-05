import { ClientsDtos, IClientsRepository } from "src/modules/clients/repositories/IClientsRepository";
import { getRepository, Repository } from "typeorm";
import { Clients } from "../entities/Clients";

class ClientsRepository implements IClientsRepository {
    private repository: Repository<Clients>;

    constructor(){
        this.repository = getRepository(Clients);
    }
    
    async searchByName(name: String): Promise<Clients[]> {
        return this.repository.createQueryBuilder()
        .select()
        .where('name ILIKE :searchTerm', {searchTerm: `%${name}%`})
        .getMany()
    }

    async findById(id: String): Promise<Clients | undefined> {
        return this.repository.findOne({where: {id}})
    }

    async create(clients: ClientsDtos): Promise<Clients> {
        clients.name = clients.name.trim();
        clients.email = clients.email.trim();

        const create = this.repository.create(clients);
        return this.repository.save(create);
    }

    async save(clients: Clients): Promise<Clients> {
        if(clients.name)
            clients.name = clients.name.trim();
            
        if(clients.email)
            clients.email = clients.email.trim();

        return this.repository.save(clients);
    }

    async index(skip?: number | undefined, take?: number | undefined): Promise<Clients[]> {
        return this.repository.find({
            skip,
            take,
            where: {
                active: true
            }
        })
    }

    async count(): Promise<number> {
        return this.repository.count({
            where: {
                active: true
            }
        });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
export default ClientsRepository
