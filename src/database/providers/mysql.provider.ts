import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DatabaseProvider } from './database.provider';

export const MySqlProvider: DatabaseProvider<MysqlConnectionOptions> = (
	config: ConfigService,
): MysqlConnectionOptions => ({
	type: 'mysql',
	host: config.get<string>('DATABASE_HOST'),
	port: config.get<number>('DATABASE_PORT'),
	username: config.get<string>('DATABASE_USER'),
	password: config.get<string>('DATABASE_PASS'),
	database: config.get<string>('DATABASE_DATABASE'),
	synchronize: config.get<boolean>('DATABASE_SYNC'),
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
});
