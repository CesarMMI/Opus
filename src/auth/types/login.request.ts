import { IsEmail, IsString } from 'class-validator';

export class LoginRequest {
	@IsEmail(undefined, { message: 'Invalid email' })
	email: string;
	@IsString()
	password: string;
}
