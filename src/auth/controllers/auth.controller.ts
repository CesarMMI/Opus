import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthResponse } from '../types/auth.response';
import { LoginRequest } from '../types/login.request';
import { RefreshRequest } from '../types/refresh.request';
import { RegisterRequest } from '../types/register.request';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@HttpCode(200)
	async login(@Body() body: LoginRequest): Promise<AuthResponse> {
		return this.authService.login(body);
	}

	@Post('register')
	@HttpCode(204)
	async register(@Body() body: RegisterRequest): Promise<void> {
		await this.authService.register(body);
	}

	@Post('refresh')
	@HttpCode(200)
	async refresh(@Body() body: RefreshRequest): Promise<AuthResponse> {
		return this.authService.refresh(body);
	}
}
