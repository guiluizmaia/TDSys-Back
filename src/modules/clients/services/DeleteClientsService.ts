import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe"
import { IClientsRepository } from "../repositories/IClientsRepository"

interface IRequest {
    id: string
}

@injectable()
class DeleteClientsService {
    constructor(
        @inject('ClientsRepository')
        private repository: IClientsRepository,
      ) {}

     public async execute({id}: IRequest): Promise<void> {
       const find = await this.repository.findById(id);
       
       if(!find) throw new AppError('Client not found', 404);
       
       await this.repository.delete(id);
    }
}

export default DeleteClientsService