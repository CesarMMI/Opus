import { Request } from 'express';
import { TokenPayload } from '../token-payload';

export class AuthRequest extends Request {
	user: TokenPayload;
}
