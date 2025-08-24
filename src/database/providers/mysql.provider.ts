import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Environment } from '../../environment/types/environment';
import { DatabaseProvider } from './database.provider';

export const MySqlProvider: DatabaseProvider<MysqlConnectionOptions> = (
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
