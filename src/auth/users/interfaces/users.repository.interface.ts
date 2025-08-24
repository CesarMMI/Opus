import { User } from '../../../entities/user.entity';

export const IUsersRepository = Symbol('IUsersRepository');

export interface IUsersRepository {
	findByEmail(email: string): Promise<User | null>;
	create(name: string, email: string, password: string): Promise<User>;
}
