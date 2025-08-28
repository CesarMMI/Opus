import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

	public findById(id: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { id } });
	}

	public findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } });
	}

	public async save(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}
}
