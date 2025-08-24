import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../environment/environment.module';
import { AuthController } from './controllers/auth.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { UsersService } from './services/users.service';
import { TokenModule } from './token/token.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UsersService, PasswordService],
	imports: [EnvironmentModule, TypeOrmModule.forFeature([User]), TokenModule],
})
export class AuthModule {}
