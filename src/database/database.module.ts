import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { EnvironmentModule } from '../environment/environment.module';
import { IEnvironmentService } from '../environment/interfaces/environment.service.interface';
import { Task } from '../tasks/entities/task.entity';
import { IDatabaseProvider } from './providers/database.provider';

@Module({})
export class DatabaseModule {
	static forRoot(provider: IDatabaseProvider): DynamicModule {
		return TypeOrmModule.forRootAsync({
			imports: [EnvironmentModule],
			inject: [IEnvironmentService],
			useFactory: (environment: IEnvironmentService) => ({
				...provider(environment.environment),
				entities: [User, Task],
			}),
		});
	}

	static forFeature(
		entities?: EntityClassOrSchema[],
		dataSource?: DataSource | DataSourceOptions | string,
	): DynamicModule {
		return TypeOrmModule.forFeature(entities, dataSource);
	}
}
