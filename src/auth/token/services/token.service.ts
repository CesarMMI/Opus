import { Inject, Injectable, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IEnvironmentService } from '../../../environment/interfaces/environment.service.interface';
import { User } from '../../../entities/user.entity';
import { ITokenService } from '../interfaces/token.service.interface';
import { TokenPayload } from '../types/token-payload';

@Injectable({ scope: Scope.DEFAULT })
export class TokenService implements ITokenService {
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

	generateAccessToken(user: User): Promise<string> {
		return this.generateToken(user, this.accessSecret, this.accessExp);
	}

	generateRefreshToken(user: User): Promise<string> {
		return this.generateToken(user, this.refreshSecret, this.refreshExp);
	}

	verifyAccessToken(token: string): Promise<TokenPayload> {
		return this.verifyToken(token, this.accessSecret);
	}

	verifyRefreshToken(token: string): Promise<TokenPayload> {
		return this.verifyToken(token, this.refreshSecret);
	}

	private generateToken(user: User, secret: string, expiresIn: string): Promise<string> {
		const payload: TokenPayload = { sub: user.id, name: user.name };
		return this.jwtService.signAsync(payload, { secret, expiresIn });
	}

	private verifyToken(token: string, secret: string): Promise<TokenPayload> {
		return this.jwtService.verifyAsync<TokenPayload>(token, { secret });
	}
}
