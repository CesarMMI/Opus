import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthTokenResponse } from '../dtos/auth-token.response';
import { AuthUserResponse } from '../dtos/auth-user.response';
import { AuthResponse } from '../dtos/auth.response';
import { LoginRequest } from '../dtos/login.request';
import { RefreshRequest } from '../dtos/refresh.request';
import { RegisterRequest } from '../dtos/register.request';
import { User } from '../entities/user.entity';
import { TokenPayload } from '../types/token-payload';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly passwordService: PasswordService,
		private readonly tokenService: TokenService,
		private readonly usersService: UsersService,
	) {}

	async login(request: LoginRequest): Promise<AuthResponse> {
		const user = await this.usersService.findByEmail(request.email);
		if (!user) throw new UnauthorizedException('Email or password is incorrect');

		const validPass = await this.passwordService.verify(user.password, request.password);
		if (!validPass) throw new UnauthorizedException('Email or password is incorrect');

		return this.generateAuthResponse(user);
	}

	async register(request: RegisterRequest): Promise<AuthResponse> {
		let user = await this.usersService.findByEmail(request.email);
		if (user) throw new BadRequestException('Email already in use');

		user = await this.usersService.create(request.name, request.email, request.password);
		if (!user) throw new InternalServerErrorException('User creation failed');

		return await this.generateAuthResponse(user);
	}

	async refresh(request: RefreshRequest): Promise<AuthResponse> {
		let payload: TokenPayload;
		try {
			payload = await this.tokenService.verifyRefreshToken(request.refreshToken);
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}
		const user = await this.usersService.findById(payload.sub);
		if (!user) throw new UnauthorizedException('User not found');

		return await this.generateAuthResponse(user, request.refreshToken);
	}

	private async generateAuthResponse(user: User, refreshToken?: string): Promise<AuthResponse> {
		const access = await this.tokenService.generateAccessToken(user);
		const refresh = refreshToken ?? (await this.tokenService.generateRefreshToken(user));
		const tokens = new AuthTokenResponse(access, refresh);
		const userResponse = new AuthUserResponse(user);
		return new AuthResponse(tokens, userResponse);
	}
}
