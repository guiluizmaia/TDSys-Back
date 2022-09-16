import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';
import { Addresses } from 'src/modules/commonData/infra/typeorm/entities/Addresses';

import { Provider } from '../infra/typeorm/entities/Provider';

export interface ProviderDtos {
  name: string;
  cnpj: string;
  email: string;
  active: boolean;
  insc_state: string;
  phones: Phones[];
  addresses: Addresses[];
}

interface IProviderRepository {
  findByEmail(email: String): Promise<Provider | undefined>;
  findByCnpj(cnpj: String): Promise<Provider | undefined>;
  findById(id: String): Promise<Provider | undefined>;
  create(provider: ProviderDtos): Promise<Provider>;
  save(provider: Provider): Promise<Provider>;
  index(skip?: number, take?: number): Promise<Provider[]>;
  count(): Promise<number>;
  delete(id: string): Promise<void>;
}

export default IProviderRepository;
