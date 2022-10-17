import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Clients } from "../infra/typeorm/entities/Clients";
import { IClientsRepository } from "../repositories/IClientsRepository";

interface IRequest extends Clients {}

@injectable()
class UpdateClientsService {
    constructor(
        @inject('ClientsRepository')
        private repository: IClientsRepository,
      ) {}


    public async execute(data: IRequest): Promise<Clients> {
        const clients = await this.repository.findById(data.id);

        if(!clients) throw new AppError('Clients not found', 404);

        Object.assign(clients, data);

        return this.repository.save(clients);
    }
}

export default UpdateClientsService