import { inject, injectable } from "tsyringe";
import { Clients } from "../infra/typeorm/entities/Clients";
import { ClientsDtos, IClientsRepository } from "../repositories/IClientsRepository";

interface IRequest extends ClientsDtos {}

@injectable()
class CreateClientsService{
    constructor(
        @inject('ClientsRepository')
        private repository: IClientsRepository,
      ) {}

    public async execute(data: IRequest): Promise<Clients> {
        return this.repository.create({...data, active: true});
    }
}

export default CreateClientsService