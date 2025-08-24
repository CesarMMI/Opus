import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PasswordModule } from './password/password.module';
import { AuthService } from './services/auth.service';
import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [TokenModule, PasswordModule, UsersModule],
})
export class AuthModule {}
