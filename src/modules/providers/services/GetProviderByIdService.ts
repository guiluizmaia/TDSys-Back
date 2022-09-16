import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";
import IProviderRepository from "../repositories/IProviderRepository";

interface IRequest {
    id: string
}

@injectable()
class GetProviderByIdService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute({id}: IRequest): Promise<Provider>{
        const provider = await this.providerRepository.findById(id);

        if(!provider) throw new AppError('Provider not found', 404);

        return provider;
    }
}

export default GetProviderByIdService