import { IsString, MinLength } from 'class-validator';

export class RefreshRequest {
	@MinLength(3)
	@IsString()
	public refreshToken: string;
}
