import { inject, injectable } from "tsyringe";
import { Properties } from "../infra/typeorm/entities/Properties";
import { IPropertiesRepository, PropertiesDtos } from "../repositories/IPropertiesRepository";

interface IRequest extends PropertiesDtos {}

@injectable()
class CreatePropertyService {
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
      ) {}

    public async execute(data: IRequest): Promise<Properties>{
        return this.repository.create(data);
    }

}

export default CreatePropertyService