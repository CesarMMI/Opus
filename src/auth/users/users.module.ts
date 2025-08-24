import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { User } from '../../entities/user.entity';
import { IUsersService } from './interfaces/users.service.interface';
import { UsersService } from './services/users.service';

@Module({
	imports: [DatabaseModule.forFeature([User])],
	providers: [
		{
			provide: IUsersService,
			useClass: UsersService,
		},
	],
	exports: [IUsersService],
})
export class UsersModule {}
