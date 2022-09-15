import { UserRepository } from 'src/modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';
import CryptHash from '../utils/CryptHash/CryptHash';
import ICryptHash from '../utils/CryptHash/ICryptHash';

container
.registerSingleton<ICryptHash>('CryptHash', CryptHash)
.registerSingleton<IUserRepository>('UserRepository', UserRepository)