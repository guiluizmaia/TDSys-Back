import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import IProviderRepository from "../repositories/IProviderRepository";

interface IRequest {
    id: string
}

@injectable()
class DeleteProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute({id}: IRequest): Promise<void>{
        const provider = await this.providerRepository.findById(id);

        if(!provider) throw new AppError('Provider not found', 404);

        await this.providerRepository.delete(id)
    }
}

export default DeleteProviderService