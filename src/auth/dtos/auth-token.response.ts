export class AuthTokenResponse {
	readonly access: string;
	readonly refresh: string;

	constructor(access: string, refresh: string) {
		this.access = access;
		this.refresh = refresh;
	}
}
