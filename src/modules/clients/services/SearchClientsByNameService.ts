import { inject, injectable } from "tsyringe";
import { Clients } from "../infra/typeorm/entities/Clients";
import { IClientsRepository } from "../repositories/IClientsRepository";

interface IRequest {
    name: string;
}

@injectable()
class SearchClientsByNameService{
    constructor(
        @inject('ClientsRepository')
        private repository: IClientsRepository,
      ) {}

    public async execute({name}: IRequest): Promise<Clients[]> {
        return this.repository.searchByName(name);
    }
}

export default SearchClientsByNameService