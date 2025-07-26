import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class TokenService {
	private readonly accessExp: string;
	private readonly refreshExp: string;
	private readonly accessSecret: string;
	private readonly refreshSecret: string;

	constructor(
		configService: ConfigService,
		private readonly jwtService: JwtService,
	) {
		this.accessExp = configService.get<string>('JWT_ACCESS_EXP')!;
		this.refreshExp = configService.get<string>('JWT_REFRESH_EXP')!;
		this.accessSecret = configService.get<string>('JWT_ACCESS_SECRET')!;
		this.refreshSecret = configService.get<string>('JWT_REFRESH_SECRET')!;
	}

	public generateAccessToken(user: User): Promise<string> {
		return this.generateToken(user, this.accessSecret, this.accessExp);
	}

	public generateRefreshToken(user: User): Promise<string> {
		return this.generateToken(user, this.refreshSecret, this.refreshExp);
	}

	public verifyAccessToken(token: string): Promise<TokenPayload> {
		return this.verifyToken(token, this.accessSecret);
	}

	public verifyRefreshToken(token: string): Promise<TokenPayload> {
		return this.verifyToken(token, this.refreshSecret);
	}

	private generateToken(user: User, secret: string, expiresIn: string): Promise<string> {
		const payload = this.generatePayload(user);
		return this.jwtService.signAsync(payload, { secret, expiresIn });
	}

	private generatePayload(user: User): TokenPayload {
		return { sub: user.id, name: user.name };
	}

	private verifyToken(token: string, secret: string): Promise<TokenPayload> {
		return this.jwtService.verifyAsync<TokenPayload>(token, { secret });
	}
}
