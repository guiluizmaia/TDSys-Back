import AppError from "src/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Provider } from "../infra/typeorm/entities/Provider";
import IProviderRepository, { ProviderDtos } from "../repositories/IProviderRepository";

interface IRequest extends ProviderDtos {}

@injectable()
class CreateProviderService {
    constructor(
        @inject('ProviderRepository')
        private providerRepository: IProviderRepository,
      ) {}

    public async execute(data: IRequest): Promise<Provider>{
        const provider = await this.providerRepository.findByCnpj(data.cnpj);
        
        if(provider) throw new AppError("Provider already exists", 401)

        return this.providerRepository.create({...data, active: true});
    }
}

export default CreateProviderService