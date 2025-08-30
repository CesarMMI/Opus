export class EnvironmentNotFoundError extends Error {
	constructor(value: string) {
		super(`Environment Value Not Found: ${value}`);
	}
}
