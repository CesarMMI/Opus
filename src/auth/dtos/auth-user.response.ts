import { User } from '../entities/user.entity';

export class AuthUserResponse {
	public readonly id: string;
	public readonly name: string;
	public readonly email: string;

	constructor(user: User) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
	}
}
