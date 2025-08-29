import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../types/requests/login.request';
import { RefreshRequest } from '../types/requests/refresh.request';
import { RegisterRequest } from '../types/requests/register.request';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@HttpCode(200)
	async login(@Body() body: LoginRequest) {
		return this.authService.login(body);
	}

	@Post('register')
	@HttpCode(204)
	async register(@Body() body: RegisterRequest) {
		await this.authService.register(body);
	}

	@Post('refresh')
	@HttpCode(200)
	async refresh(@Body() body: RefreshRequest) {
		return this.authService.refresh(body);
	}
}
