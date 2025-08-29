import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EnvironmentService } from '../../environment/services/environment.service';

@Injectable()
export class PasswordService {
	private readonly passwordSalt: number;

	constructor(environmentService: EnvironmentService) {
		this.passwordSalt = environmentService.environment.security.passwordSalt;
	}

	async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(this.passwordSalt);
		return bcrypt.hash(password, salt);
	}

	async verify(hashedPassword: string, password: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}
