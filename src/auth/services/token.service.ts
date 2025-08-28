import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IEnvironmentService } from '../../environment/interfaces/environment.service.interface';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class TokenService {
	private readonly accessExp: string;
	private readonly accessSecret: string;
	private readonly refreshExp: string;
	private readonly refreshSecret: string;

	constructor(
		@Inject(IEnvironmentService) environmentService: IEnvironmentService,
		private readonly jwtService: JwtService,
	) {
		this.accessExp = environmentService.environment.security.jwt.accessExp;
		this.accessSecret = environmentService.environment.security.jwt.accessSecret;
		this.refreshExp = environmentService.environment.security.jwt.refreshExp;
		this.refreshSecret = environmentService.environment.security.jwt.refreshSecret;
	}

	generateAccessToken(sub: string, name: string): Promise<string> {
		return this.generateToken(sub, name, this.accessSecret, this.accessExp);
	}

	generateRefreshToken(sub: string, name: string): Promise<string> {
		return this.generateToken(sub, name, this.refreshSecret, this.refreshExp);
	}

	verifyAccessToken(token: string): Promise<TokenPayload> {
		return this.verifyToken(token, this.accessSecret);
	}

	verifyRefreshToken(token: string): Promise<TokenPayload> {
		return this.verifyToken(token, this.refreshSecret);
	}

	private generateToken(sub: string, name: string, secret: string, expiresIn: string): Promise<string> {
		const payload: TokenPayload = { sub, name };
		return this.jwtService.signAsync(payload, { secret, expiresIn });
	}

	private verifyToken(token: string, secret: string): Promise<TokenPayload> {
		return this.jwtService.verifyAsync<TokenPayload>(token, { secret });
	}
}
