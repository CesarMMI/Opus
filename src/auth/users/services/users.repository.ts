import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { IUsersRepository } from '../interfaces/users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@InjectRepository(User) private readonly ormRepository: Repository<User>) {}

	findByEmail(email: string): Promise<User | null> {
		return this.ormRepository.findOne({ where: { email } });
	}

	async create(name: string, email: string, password: string): Promise<User> {
		let user = new User();
		user.name = name;
		user.email = email;
		user.password = password;
		user = await this.ormRepository.save(user);
		return user;
	}
}
