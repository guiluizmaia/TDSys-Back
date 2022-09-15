import { Phones } from 'src/modules/commonData/infra/typeorm/entities/Phones';
import { User } from '../infra/typeorm/entities/User';

export interface UserDtos {
  email: string;
  password: string;
  name: string;
  cpf: string;
  active: boolean;
  phones: Phones[];
}

interface IUserRepository {
  findByEmail(email: String): Promise<User | undefined>;
  findById(id: String): Promise<User | undefined>;
  create(user: UserDtos): Promise<User>;
  save(user: User): Promise<User>;
  index(skip?: number, take?: number): Promise<User[]>;
  count(): Promise<number>;
  delete(id: string): Promise<void>;
}

export default IUserRepository;
