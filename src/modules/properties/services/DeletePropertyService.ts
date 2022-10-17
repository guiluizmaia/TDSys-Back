import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IPropertiesRepository } from "../repositories/IPropertiesRepository";

interface IRequest {
    id: string
}

@injectable()
class DeletePropertyService {
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
      ) {}

    public async execute({id}: IRequest): Promise<void> {
      const find = await this.repository.findById(id);
      
      if(!find) throw new AppError('Property not found', 404);
      
      await this.repository.delete(id);
    }
}

export default DeletePropertyService