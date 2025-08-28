import { IsBoolean } from 'class-validator';

export class UpdateTaskRequest {
	@IsBoolean()
	done: boolean;
}
