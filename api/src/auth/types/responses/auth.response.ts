import { AuthTokenResponse } from './auth-token.response';
import { AuthUserResponse } from './auth-user.response';

export class AuthResponse {
	readonly tokens: AuthTokenResponse;
	readonly user: AuthUserResponse;

	constructor(tokens: AuthTokenResponse, user: AuthUserResponse) {
		this.tokens = tokens;
		this.user = user;
	}
}
