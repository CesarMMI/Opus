import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SqlServerProvider } from './database/providers/sql-server.provider';
import { EnvironmentModule } from './environment/environment.module';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule.forRoot(SqlServerProvider), AuthModule, EnvironmentModule],
})
export class AppModule {}
