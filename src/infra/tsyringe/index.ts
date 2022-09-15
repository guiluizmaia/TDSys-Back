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