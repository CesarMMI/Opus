import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskRequest {
	@IsString()
	@MaxLength(50)
	title: string;
	@IsOptional()
	@MaxLength(100)
	description?: string;
}
