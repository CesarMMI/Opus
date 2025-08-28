import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Environment } from '../../environment/types/environment';
import { IDatabaseProvider } from './database.provider';

export const MySqlProvider: IDatabaseProvider<MysqlConnectionOptions> = (
	environment: Environment,
): MysqlConnectionOptions => ({
	type: 'mysql',
	host: environment.database.host,
	port: environment.database.port,
	username: environment.database.user,
	password: environment.database.pass,
	database: environment.database.database,
	synchronize: environment.database.sync,
});
