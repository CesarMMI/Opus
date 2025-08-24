import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ITokenService } from '../token/interfaces/token.service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(@Inject(ITokenService) private readonly tokenService: ITokenService) {}

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
