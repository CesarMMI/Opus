import { User } from '../../../entities/user.entity';
import { TokenPayload } from './../types/token-payload';

export const ITokenService = Symbol('ITokenService');

export interface ITokenService {
	generateAccessToken(user: User): Promise<string>;
	generateRefreshToken(user: User): Promise<string>;
	verifyAccessToken(token: string): Promise<TokenPayload>;
	verifyRefreshToken(token: string): Promise<TokenPayload>;
}
