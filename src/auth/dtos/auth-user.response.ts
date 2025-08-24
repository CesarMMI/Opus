import { User } from '../../entities/user.entity';

export class AuthUserResponse {
	readonly name: string;
	readonly email: string;

	constructor(user: User) {
		this.name = user.name;
		this.email = user.email;
	}
}
