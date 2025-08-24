export class EnvironmentNotFoundError extends Error {
	constructor(value: string) {
		super(`Environment Not Found: ${value}`);
	}
}
