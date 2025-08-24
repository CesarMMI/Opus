import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { Environment } from '../../environment/types/environment';
import { DatabaseProvider } from './database.provider';

export const SqlServerProvider: DatabaseProvider<SqlServerConnectionOptions> = (environment: Environment) => {
	const options: SqlServerConnectionOptions = {
		type: 'mssql',
		host: environment.database.host,
		port: environment.database.port,
		username: environment.database.user,
		password: environment.database.pass,
		database: environment.database.database,
		synchronize: environment.database.sync,
		options: { encrypt: false, trustServerCertificate: true },
	};
	return options;
};
