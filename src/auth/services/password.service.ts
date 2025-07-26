import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
	private readonly saltRounds: number;

	constructor(configService: ConfigService) {
		this.saltRounds = +configService.get('PASSWORD_SALT_ROUNDS')!;
	}

	public async hash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(this.saltRounds);
		return bcrypt.hash(password, salt);
	}

	public async verify(hashedPassword: string, password: string): Promise<boolean> {
		return bcrypt.compare(password, hashedPassword);
	}
}
