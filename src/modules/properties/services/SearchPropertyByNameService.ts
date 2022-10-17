import { inject, injectable } from "tsyringe";
import { Properties } from "../infra/typeorm/entities/Properties";
import { IPropertiesRepository } from "../repositories/IPropertiesRepository";

interface IRequest {
    name: string;
}

@injectable()
class SearchPropertyByNameService{
    constructor(
        @inject('PropertiesRepository')
        private repository: IPropertiesRepository,
    ) {}

    public async execute({name}: IRequest): Promise<Properties[]> {
        return this.repository.searchByName(name);
    }
}

export default SearchPropertyByNameService
