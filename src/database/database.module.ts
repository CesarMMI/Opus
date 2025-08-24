import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { User } from 'src/entities/user.entity';
import { EnvironmentModule } from 'src/environment/environment.module';
import { IEnvironmentService } from 'src/environment/interfaces/environment.service.interface';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseProvider } from './providers/database.provider';

@Module({})
export class DatabaseModule {
	static forRoot(provider: DatabaseProvider): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [
				TypeOrmModule.forRootAsync({
					imports: [EnvironmentModule],
					inject: [IEnvironmentService],
					useFactory: (environment: IEnvironmentService) => ({
						...provider(environment.environment),
						entities: [User],
					}),
				}),
			],
		};
	}

	static forFeature(
		entities?: EntityClassOrSchema[],
		dataSource?: DataSource | DataSourceOptions | string,
	): DynamicModule {
		return {
			module: DatabaseModule,
			imports: [TypeOrmModule.forFeature(entities, dataSource)],
		};
	}
}
