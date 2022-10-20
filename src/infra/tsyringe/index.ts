import ClientsRepository from 'src/modules/clients/infra/typeorm/repositories/ClientsRepository';
import { IClientsRepository } from 'src/modules/clients/repositories/IClientsRepository';
import ProductRepository from 'src/modules/products/infra/typeorm/repositories/ProductRepository';
import { IProductRepository } from 'src/modules/products/repositories/IProductRepository';
import PropertiesRepository from 'src/modules/properties/infra/typeorm/repositories/PropertiesRepository';
import { IPropertiesRepository } from 'src/modules/properties/repositories/IPropertiesRepository';
import { ProviderRepository } from 'src/modules/providers/infra/typeorm/repositories/ProviderRepository';
import IProviderRepository from 'src/modules/providers/repositories/IProviderRepository';
import TalhaoRepository from 'src/modules/talhao/infra/typeorm/repositories/TalhaoRepository';
import { ITalhaoRepository } from 'src/modules/talhao/repositories/ITalhaoRepository';
import { UserRepository } from 'src/modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';
import CryptHash from '../utils/CryptHash/CryptHash';
import ICryptHash from '../utils/CryptHash/ICryptHash';
import INumeric from '../utils/Numerics/INumeric';
import Numeric from '../utils/Numerics/Numeric';

container
.registerSingleton<ICryptHash>('CryptHash', CryptHash)
.registerSingleton<INumeric>('Numeric', Numeric)
.registerSingleton<IUserRepository>('UserRepository', UserRepository)
.registerSingleton<IProviderRepository>('ProviderRepository', ProviderRepository)
.registerSingleton<IProductRepository>('ProductRepository', ProductRepository)
.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository)
.registerSingleton<IPropertiesRepository>('PropertiesRepository', PropertiesRepository)
.registerSingleton<ITalhaoRepository>('TalhaoRepository', TalhaoRepository)
