import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest {
    id: string
}

@injectable()
class DeleteTalhaoService {
    constructor(
        @inject('TalhaoRepository')
        private repository: ITalhaoRepository,
      ) {}

    public async execute({id}: IRequest): Promise<void> {
      const find = await this.repository.findById(id);
      
      if(!find) throw new AppError('Talhao not found', 404);
      
      await this.repository.delete(id);
    }
}

export default DeleteTalhaoService