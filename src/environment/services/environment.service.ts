import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentService } from '../interfaces/environment.service.interface';
import { Environment } from '../types/environment';
import { EnvironmentDatabase } from '../types/environment-database';
import { EnvironmentNotFoundError } from '../types/environment-not-found.error';
import { EnvironmentSecurity } from '../types/environment-security';

@Injectable({ scope: Scope.DEFAULT })
export class EnvironmentServiceImp implements IEnvironmentService {
	private _environment: Environment;

	get environment(): Environment {
		return this._environment;
	}

	constructor(configService: ConfigService) {
		const database = this.getDatabase(configService);
		const security = this.getSecurity(configService);
		this._environment = { database, security };
	}

	private getDatabase(configService: ConfigService): EnvironmentDatabase {
		const host = configService.get<string>('DATABASE_HOST');
		if (!host) throw new EnvironmentNotFoundError('Database Host');

		const portStr = configService.get<string>('DATABASE_PORT');
		if (!portStr) throw new EnvironmentNotFoundError('Database Port');
		const port = +portStr;

		const user = configService.get<string>('DATABASE_USER');
		if (!user) throw new EnvironmentNotFoundError('Database User');

		const pass = configService.get<string>('DATABASE_PASS');
		if (!pass) throw new EnvironmentNotFoundError('Database Pass');

		const database = configService.get<string>('DATABASE_DATABASE');
		if (!database) throw new EnvironmentNotFoundError('Database Database');

		const sync = !!configService.get<string>('DATABASE_SYNC');
		if (!sync) throw new EnvironmentNotFoundError('Database Sync');

		return { host, port, user, pass, database, sync };
	}

	private getSecurity(configService: ConfigService): EnvironmentSecurity {
		const passwordSaltStr = configService.get<string>('SECURITY_PASSWORD_SALT');
		if (!passwordSaltStr) throw new EnvironmentNotFoundError('Security Password Salt');
		const passwordSalt = +passwordSaltStr;

		const accessExp = configService.get<string>('SECURITY_JWT_ACCESS_EXP');
		if (!accessExp) throw new EnvironmentNotFoundError('Security Jwt Access Exp');

		const accessSecret = configService.get<string>('SECURITY_JWT_ACCESS_SECRET');
		if (!accessSecret) throw new EnvironmentNotFoundError('Security Jwt Access Secret');

		const refreshExp = configService.get<string>('SECURITY_JWT_REFRESH_EXP');
		if (!refreshExp) throw new EnvironmentNotFoundError('Security Jwt Refresh Exp');

		const refreshSecret = configService.get<string>('SECURITY_JWT_REFRESH_SECRET');
		if (!refreshSecret) throw new EnvironmentNotFoundError('Security Jwt Refresh Secret');

		return { passwordSalt, jwt: { accessExp, accessSecret, refreshExp, refreshSecret } };
	}
}
