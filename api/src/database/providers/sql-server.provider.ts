import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
import { Environment } from '../../environment/types/environment';
import { IDatabaseProvider } from './database.provider';

export const SqlServerProvider: IDatabaseProvider<SqlServerConnectionOptions> = (environment: Environment) => ({
	type: 'mssql',
	host: environment.database.host,
	port: environment.database.port,
	username: environment.database.user,
	password: environment.database.pass,
	database: environment.database.database,
	synchronize: environment.database.sync,
	options: { encrypt: false, trustServerCertificate: true },
});
