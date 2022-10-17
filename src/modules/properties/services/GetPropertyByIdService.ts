import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Properties } from "../infra/typeorm/entities/Properties";
import { IPropertiesRepository } from "../repositories/IPropertiesRepository";

interface IRequest {
    id: string;
}

@injectable()
class GetPropertyByIdService {
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
      ) {}

    public async execute({id}: IRequest): Promise<Properties> {
      const property = await this.repository.findById(id);
      
      if(!property) throw new AppError('Property not found', 404);
      
      return property;
    }
}

export default GetPropertyByIdService