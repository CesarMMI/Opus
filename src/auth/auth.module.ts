import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from '../environment/environment.module';
import { AuthController } from './controllers/auth.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UsersService, PasswordService, TokenService],
	imports: [EnvironmentModule, TypeOrmModule.forFeature([User]), JwtModule.register({ global: true })],
})
export class AuthModule {}
