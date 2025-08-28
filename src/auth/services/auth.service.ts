import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { LoginRequest } from '../types/requests/login.request';
import { RefreshRequest } from '../types/requests/refresh.request';
import { RegisterRequest } from '../types/requests/register.request';
import { AuthTokenResponse } from '../types/responses/auth-token.response';
import { AuthUserResponse } from '../types/responses/auth-user.response';
import { AuthResponse } from '../types/responses/auth.response';
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
		const saved = await this.usersService.findByEmail(request.email);
		if (saved) throw new BadRequestException('Email already in use');

		let user = new User();
		user.name = request.name;
		user.email = request.email;
		const hashedPassword = await this.passwordService.hash(request.password);
		user.password = hashedPassword;

		user = await this.usersService.save(user);
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
		const access = await this.tokenService.generateAccessToken(user.id, user.name);
		const refresh = refreshToken ?? (await this.tokenService.generateRefreshToken(user.id, user.name));
		const tokens = new AuthTokenResponse(access, refresh);
		const userResponse = new AuthUserResponse(user);
		return new AuthResponse(tokens, userResponse);
	}
}
