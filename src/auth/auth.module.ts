import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthController } from './controllers/auth.controller';
import { PasswordModule } from './password/password.module';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { TokenModule } from './token/token.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UsersService],
	imports: [TokenModule, PasswordModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
