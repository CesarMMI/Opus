import { ConfigService } from '@nestjs/config';
import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { DatabaseProvider } from './database.provider';

export const SqlServerProvider: DatabaseProvider<SqlServerConnectionOptions> = (config: ConfigService) => {
	const options: SqlServerConnectionOptions = {
		type: 'mssql',
		host: config.get<string>('DATABASE_HOST'),
		port: +config.get<number>('DATABASE_PORT')!,
		username: config.get<string>('DATABASE_USER'),
		password: config.get<string>('DATABASE_PASS'),
		database: config.get<string>('DATABASE_DATABASE'),
		synchronize: config.get<boolean>('DATABASE_SYNC'),
		options: {
			encrypt: false,
			trustServerCertificate: true,
		},
		entities: [__dirname + '/**/*.entity{.ts,.js}'],
	};
	return options;
};
