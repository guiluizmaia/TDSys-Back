import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Talhao } from "../infra/typeorm/entities/Talhao";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest extends Talhao {}

@injectable()
class UpdateTalhaoService {
    constructor(
        @inject('TalhaoRepository')
        private repository: ITalhaoRepository,
    ) {}

    public async execute(data: IRequest): Promise<Talhao> {
        const talhao = await this.repository.findById(data.id);

        if(!talhao) throw new AppError('Talhao not found', 404);

        Object.assign(talhao, data);

        return this.repository.save(talhao);
    }
}

export default UpdateTalhaoService