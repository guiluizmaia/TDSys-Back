import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Clients } from "../infra/typeorm/entities/Clients";
import { IClientsRepository } from "../repositories/IClientsRepository";

interface IRequest {
    id: string;
}

@injectable()
class GetClientsByIdService {
    constructor(
        @inject('ClientsRepository')
        private repository: IClientsRepository,
      ) {}

    public async execute({id}: IRequest): Promise<Clients> {
        const client = await this.repository.findById(id);
        
        if(!client) throw new AppError('Client not found', 404);
        
        return client;
    }
}

export default GetClientsByIdService