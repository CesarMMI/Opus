import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from '../../environment/types/environment';

export type DatabaseProvider<T extends TypeOrmModuleOptions = TypeOrmModuleOptions> = (environment: Environment) => T;
