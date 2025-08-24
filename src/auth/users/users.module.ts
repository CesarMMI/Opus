import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { User } from '../../entities/user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { UsersRepository } from './services/users.repository';

@Module({
	imports: [DatabaseModule.forFeature([User])],
	providers: [
		{
			provide: IUsersRepository,
			useClass: UsersRepository,
		},
	],
	exports: [IUsersRepository],
})
export class UsersModule {}
