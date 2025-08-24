import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly passwordService: PasswordService,
	) {}

	findById(id: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { id } });
	}

	findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } });
	}

	async create(name: string, email: string, password: string): Promise<User> {
		let user = new User();
		user.name = name;
		user.email = email;
		user.password = await this.passwordService.hash(password);
		user = await this.userRepository.save(user);
		return user;
	}
}
