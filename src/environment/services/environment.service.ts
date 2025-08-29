import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment, EnvironmentDatabase, EnvironmentSecurity } from '../types/environment';
import { EnvironmentNotFoundError } from '../types/environment-not-found.error';

@Injectable({ scope: Scope.DEFAULT })
export class EnvironmentService {
	private _environment: Environment;

	get environment(): Environment {
		return this._environment;
	}

	constructor(configService: ConfigService) {
		const database = this.getDatabase(configService);
		const security = this.getSecurity(configService);
		this._environment = { database, security };
	}

	private getDatabase(config: ConfigService): EnvironmentDatabase {
		return {
			host: this.getStringValue(config, 'DATABASE_HOST'),
			port: this.getNumberValue(config, 'DATABASE_PORT'),
			user: this.getStringValue(config, 'DATABASE_USER'),
			pass: this.getStringValue(config, 'DATABASE_PASS'),
			database: this.getStringValue(config, 'DATABASE_DATABASE'),
			sync: !!this.getNumberValue(config, 'DATABASE_SYNC'),
		};
	}

	private getSecurity(configService: ConfigService): EnvironmentSecurity {
		return {
			passwordSalt: this.getNumberValue(configService, 'SECURITY_PASSWORD_SALT'),
			jwt: {
				accessExp: this.getStringValue(configService, 'SECURITY_JWT_ACCESS_EXP'),
				accessSecret: this.getStringValue(configService, 'SECURITY_JWT_ACCESS_SECRET'),
				refreshExp: this.getStringValue(configService, 'SECURITY_JWT_REFRESH_EXP'),
				refreshSecret: this.getStringValue(configService, 'SECURITY_JWT_REFRESH_SECRET'),
			},
		};
	}

	private getNumberValue(config: ConfigService, key: string): number {
		return +this.getStringValue(config, key);
	}

	private getStringValue(config: ConfigService, key: string): string {
		const value = config.get<string>(key);
		if (!value) throw new EnvironmentNotFoundError(key);
		return value;
	}
}
