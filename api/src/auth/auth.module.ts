import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/auth/entities/user.entity';
import { EnvironmentModule } from 'src/environment/environment.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, PasswordService, TokenService, UsersService],
	imports: [DatabaseModule.forFeature([User]), EnvironmentModule, JwtModule],
	exports: [TokenService],
})
export class AuthModule {}
