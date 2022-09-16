import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";
import IProviderRepository from "../repositories/IProviderRepository";

interface IRequest extends Provider {}

@injectable()
class UpdateProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute(data: IRequest): Promise<Provider>{
        const provider = await this.providerRepository.findById(data.id);

        if(!provider) throw new AppError('Provider not found', 404);

        Object.assign(provider, data);

        return this.providerRepository.save(provider);
    }
}

export default UpdateProviderService