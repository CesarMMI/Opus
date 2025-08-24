import { User } from '../../../entities/user.entity';

export const IUsersService = Symbol('IUsersService');

export interface IUsersService {
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	create(name: string, email: string, password: string): Promise<User>;
}
