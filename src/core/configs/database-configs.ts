import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/auth/entities/user.entity';

const databaseConfigsFactory = (config: ConfigService) => ({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	type: config.get<any>('DATABASE_TYPE')!,
	host: config.get<string>('DATABASE_HOST'),
	port: config.get<number>('DATABASE_PORT'),
	username: config.get<string>('DATABASE_USER'),
	password: config.get<string>('DATABASE_PASS'),
	database: config.get<string>('DATABASE_DATABASE'),
	synchronize: config.get<boolean>('DATABASE_SYNC'),
	entities: [User],
});

export const databaseConfigs = () => ({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: databaseConfigsFactory,
});
