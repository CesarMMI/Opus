import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { EnvironmentModule } from 'src/environment/environment.module';
import { IEnvironmentService } from 'src/environment/interfaces/environment.service.interface';
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
}
