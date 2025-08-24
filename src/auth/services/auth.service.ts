import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthTokenResponse } from '../types/auth-token.response';
import { AuthUserResponse } from '../types/auth-user.response';
import { AuthResponse } from '../types/auth.response';
import { LoginRequest } from '../types/login.request';
import { RefreshRequest } from '../types/refresh.request';
import { RegisterRequest } from '../types/register.request';
import { IPasswordService } from '../password/interfaces/password.service.interface';
import { ITokenService } from '../token/interfaces/token.service.interface';
import { TokenPayload } from '../token/types/token-payload';
import { IUsersService } from '../users/interfaces/users.service.interface';

@Injectable()
export class AuthService {
	constructor(
		@Inject(IPasswordService) private readonly passwordService: IPasswordService,
		@Inject(ITokenService) private readonly tokenService: ITokenService,
		@Inject(IUsersService) private readonly usersService: IUsersService,
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

		const hashedPassword = await this.passwordService.hash(request.password);
		user = await this.usersService.create(request.name, request.email, hashedPassword);
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
