import { inject, injectable } from "tsyringe";
import { Talhao } from "../infra/typeorm/entities/Talhao";
import { ITalhaoRepository, TalhaoDtos } from "../repositories/ITalhaoRepository";

interface IRequest extends TalhaoDtos {}

@injectable()
class CreateTalhaoService {
    constructor(
        @inject('TalhaoRepository')
        private repository: ITalhaoRepository,
      ) {}

    public async execute(data: IRequest): Promise<Talhao>{
        return this.repository.create(data);
    }

}

export default CreateTalhaoService