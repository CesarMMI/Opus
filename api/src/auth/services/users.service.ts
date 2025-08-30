import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from './password.service';

@Injectable()
export class UsersService {
	constructor(
		private readonly passwordService: PasswordService,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	findById(id: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { id } });
	}

	findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } });
	}

	async create(name: string, email: string, password: string): Promise<User> {
		const user = new User();
		user.name = name;
		user.email = email;
		user.password = await this.passwordService.hash(password);
		return await this.userRepository.save(user);
	}
}
