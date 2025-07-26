import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from './services/password.service';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UsersService, PasswordService, TokenService],
	imports: [ConfigModule, TypeOrmModule.forFeature([User]), JwtModule.register({ global: true })],
})
export class AuthModule {}
