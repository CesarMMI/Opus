/* eslint-disable @typescript-eslint/unbound-method */
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TokenService } from 'src/auth/services/token.service';
import { TokenPayload } from 'src/auth/types/token-payload';

describe('AuthGuard', () => {
	let guard: AuthGuard;
	let tokenService: jest.Mocked<TokenService>;
	let mockRequest: { headers: Record<string, string | undefined>; user?: TokenPayload };

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [AuthGuard, { provide: TokenService, useValue: { verifyAccessToken: jest.fn() } }],
		}).compile();

		guard = module.get<AuthGuard>(AuthGuard);
		tokenService = module.get(TokenService);
		mockRequest = { headers: {} };
	});

	const createMockContext = () =>
		({ switchToHttp: () => ({ getRequest: () => mockRequest }) }) as unknown as ExecutionContext;

	it('should allow access when token is valid', async () => {
		mockRequest.headers.authorization = 'Bearer valid_token';
		tokenService.verifyAccessToken.mockResolvedValue({ sub: '41f9f40b-e780-42ac-b5b6-0850afb519c3', name: 'John' });

		const result = await guard.canActivate(createMockContext());

		expect(result).toBe(true);
		expect(tokenService.verifyAccessToken).toHaveBeenCalledWith('valid_token');
		expect(mockRequest.user).toEqual({ sub: '41f9f40b-e780-42ac-b5b6-0850afb519c3', name: 'John' });
	});

	it('should throw unauthorized when header authorization is not present', async () => {
		mockRequest.headers.authorization = undefined;

		await expect(guard.canActivate(createMockContext())).rejects.toThrow(UnauthorizedException);
	});

	it('should throw unauthorized when header authorization does not start with Bearer', async () => {
		mockRequest.headers.authorization = 'Token abc';

		await expect(guard.canActivate(createMockContext())).rejects.toThrow(UnauthorizedException);
	});

	it('should throw unauthorized when o token is invalid', async () => {
		mockRequest.headers.authorization = 'Bearer invalid_token';
		tokenService.verifyAccessToken.mockRejectedValue(new Error('Token error'));

		await expect(guard.canActivate(createMockContext())).rejects.toThrow(UnauthorizedException);
	});
});
