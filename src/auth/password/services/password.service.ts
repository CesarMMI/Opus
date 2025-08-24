import { Inject, Injectable, Scope } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEnvironmentService } from '../../../environment/interfaces/environment.service.interface';
import { IPasswordService } from '../interfaces/password.service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class PasswordService implements IPasswordService {
	private readonly passwordSalt: number;

	constructor(@Inject(IEnvironmentService) environmentService: IEnvironmentService) {
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
