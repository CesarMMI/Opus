import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { PasswordService } from 'src/auth/services/password.service';
import { TokenService } from 'src/auth/services/token.service';
import { UsersService } from 'src/auth/services/users.service';
import { LoginRequest } from 'src/auth/types/requests/login.request';
import { RefreshRequest } from 'src/auth/types/requests/refresh.request';
import { RegisterRequest } from 'src/auth/types/requests/register.request';
import { AuthResponse } from 'src/auth/types/responses/auth.response';

describe('AuthService', () => {
	let service: AuthService;
	let passwordService: jest.Mocked<PasswordService>;
	let tokenService: jest.Mocked<TokenService>;
	let usersService: jest.Mocked<UsersService>;

	const mockUser: User = {
		id: 'b76c9e4c-835e-4a27-a91c-f1a16ec947f1',
		name: 'John Doe',
		email: 'john@example.com',
		password: 'hashedPass',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: PasswordService, useValue: { verify: jest.fn(), hash: jest.fn() } },
				{
					provide: TokenService,
					useValue: { verifyRefreshToken: jest.fn(), generateAccessToken: jest.fn(), generateRefreshToken: jest.fn() },
				},
				{ provide: UsersService, useValue: { findByEmail: jest.fn(), findById: jest.fn(), save: jest.fn() } },
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		passwordService = module.get(PasswordService);
		tokenService = module.get(TokenService);
		usersService = module.get(UsersService);
	});

	describe('login', () => {
		it('should login successfully', async () => {
			usersService.findByEmail.mockResolvedValue(mockUser);
			passwordService.verify.mockResolvedValue(true);
			tokenService.generateAccessToken.mockResolvedValue('access_token');
			tokenService.generateRefreshToken.mockResolvedValue('refresh_token');

			const request: LoginRequest = { email: mockUser.email, password: '123' };
			const result = await service.login(request);

			expect(result).toBeInstanceOf(AuthResponse);
			expect(usersService.findByEmail).toHaveBeenCalledWith(mockUser.email);
			expect(passwordService.verify).toHaveBeenCalledWith(mockUser.password, '123');
		});

		it('should throw unauthorized if user does not exists', async () => {
			usersService.findByEmail.mockResolvedValue(null);
			const request: LoginRequest = { email: 'x', password: '123' };
			await expect(service.login(request)).rejects.toThrow(UnauthorizedException);
		});

		it('should throw unauthorized if password is invalid', async () => {
			usersService.findByEmail.mockResolvedValue(mockUser);
			passwordService.verify.mockResolvedValue(false);
			const request: LoginRequest = { email: mockUser.email, password: 'y' };
			await expect(service.login(request)).rejects.toThrow(UnauthorizedException);
		});
	});

	describe('register', () => {
		it('should register successfully', async () => {
			usersService.findByEmail.mockResolvedValue(null);
			passwordService.hash.mockResolvedValue('hashed123');
			usersService.save.mockResolvedValue(mockUser);
			tokenService.generateAccessToken.mockResolvedValue('access_token');
			tokenService.generateRefreshToken.mockResolvedValue('refresh_token');

			const request: RegisterRequest = { name: 'John', email: 'john@example.com', password: '123' };
			const result = await service.register(request);

			expect(result).toBeInstanceOf(AuthResponse);
			expect(usersService.save).toHaveBeenCalled();
			expect(passwordService.hash).toHaveBeenCalledWith('123');
		});

		it('should throw bad request if email already exists', async () => {
			usersService.findByEmail.mockResolvedValue(mockUser);
			const request: RegisterRequest = { name: mockUser.name, email: mockUser.email, password: '' };
			await expect(service.register(request)).rejects.toThrow(BadRequestException);
		});
	});

	describe('refresh', () => {
		it('should refresh successfully', async () => {
			tokenService.verifyRefreshToken.mockResolvedValue({ sub: mockUser.id, name: mockUser.name });
			usersService.findById.mockResolvedValue(mockUser);
			tokenService.generateAccessToken.mockResolvedValue('access_token');

			const request: RefreshRequest = { refreshToken: 'refresh_token' };
			const result = await service.refresh(request);

			expect(result).toBeInstanceOf(AuthResponse);
			expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith('refresh_token');
			expect(usersService.findById).toHaveBeenCalledWith(mockUser.id);
		});

		it('should throw unauthorized if refresh token is invalid', async () => {
			tokenService.verifyRefreshToken.mockRejectedValue(new Error());
			const request: RefreshRequest = { refreshToken: 'bad_token' };
			await expect(service.refresh(request)).rejects.toThrow(UnauthorizedException);
		});

		it('should throw unauthorized if user  does not exists', async () => {
			tokenService.verifyRefreshToken.mockResolvedValue({ sub: mockUser.id, name: mockUser.name });
			usersService.findById.mockResolvedValue(null);
			const request: RefreshRequest = { refreshToken: 'refresh_token' };
			await expect(service.refresh(request)).rejects.toThrow(UnauthorizedException);
		});
	});
});
