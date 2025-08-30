import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SqlServerProvider } from './database/providers/sql-server.provider';
import { EnvironmentModule } from './environment/environment.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [EnvironmentModule.forRoot(), DatabaseModule.forRoot(SqlServerProvider), AuthModule, TasksModule],
})
export class AppModule {}
