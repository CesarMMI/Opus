import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type DatabaseProvider<T extends TypeOrmModuleOptions = TypeOrmModuleOptions> = (config: ConfigService) => T;
