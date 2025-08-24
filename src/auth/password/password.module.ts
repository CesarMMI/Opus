import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../../environment/environment.module';
import { IPasswordService } from './interfaces/password.service.interface';
import { PasswordService } from './services/password.service';

@Module({
	imports: [EnvironmentModule],
	providers: [
		{
			provide: IPasswordService,
			useClass: PasswordService,
		},
	],
	exports: [IPasswordService],
})
export class PasswordModule {}
