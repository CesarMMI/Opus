import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseProvider } from './providers/database.provider';

@Module({})
export class DatabaseModule {
	static forRoot(provider: DatabaseProvider): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					imports: [ConfigModule],
					inject: [ConfigService],
					useFactory: (config: ConfigService) => provider(config),
				}),
			],
		};
	}
}
