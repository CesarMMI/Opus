import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { databaseConfigs } from './core/configs/database-configs';

@Module({
	imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync(databaseConfigs()), AuthModule],
})
export class AppModule {}
