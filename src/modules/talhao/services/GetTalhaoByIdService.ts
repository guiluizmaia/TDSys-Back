import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Talhao } from "../infra/typeorm/entities/Talhao";
import { ITalhaoRepository } from "../repositories/ITalhaoRepository";

interface IRequest {
    id: string;
}

@injectable()
class GetTalhaoByIdService {
  constructor(
    @inject('TalhaoRepository')
    private repository: ITalhaoRepository,
  ) {}

    public async execute({id}: IRequest): Promise<Talhao> {
      const talhao = await this.repository.findById(id);
      
      if(!talhao) throw new AppError('talhao not found', 404);
      
      return talhao;
    }
}

export default GetTalhaoByIdService