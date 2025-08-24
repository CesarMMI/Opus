import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly tokenService: TokenService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		try {
			const token = this.extractTokenFromHeader(request);
			const payload = await this.tokenService.verifyAccessToken(token);
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string {
		const [type, headerToken] = request.headers.authorization?.split(' ') ?? [];
		const token = type === 'Bearer' ? headerToken : undefined;
		if (!token) throw new UnauthorizedException('Authorization header is missing or malformed');
		return token;
	}
}
