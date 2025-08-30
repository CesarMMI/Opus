import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from '../../environment/types/environment';

export interface IDatabaseProvider<T extends TypeOrmModuleOptions = TypeOrmModuleOptions> {
	(environment: Environment): T;
}
