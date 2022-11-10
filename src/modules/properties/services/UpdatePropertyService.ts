import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Properties } from "../infra/typeorm/entities/Properties";
import { IPropertiesRepository } from "../repositories/IPropertiesRepository";

interface IRequest extends Properties {}

@injectable()
class UpdatePropertyService {
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
    ) {}

    public async execute(data: IRequest): Promise<Properties> {
        const properties = await this.repository.findById(data.id);

        if(!properties) throw new AppError('Properties not found', 404);


        const {client, ...propertie} = properties

        Object.assign(propertie, data);

        return this.repository.save(propertie);
    }
}

export default UpdatePropertyService