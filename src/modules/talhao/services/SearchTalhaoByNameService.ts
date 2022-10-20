import { inject, injectable } from "tsyringe";
import { Talhao } from "../infra/typeorm/entities/Talhao";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest {
    name: string;
}

@injectable()
class SearchTalhaoByNameService{
    constructor(
        @inject('TalhaoRepository')
        private repository: ITalhaoRepository,
    ) {}

    public async execute({name}: IRequest): Promise<Talhao[]> {
        return this.repository.searchByName(name);
    }
}

export default SearchTalhaoByNameService
