import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterRequest {
	@MaxLength(50)
	@MinLength(3)
	@IsString()
	name: string;
	@MaxLength(50)
	@MinLength(3)
	@IsEmail(undefined, { message: 'Invalid email' })
	email: string;
	@MaxLength(50)
	@MinLength(5)
	@IsString()
	password: string;
}
