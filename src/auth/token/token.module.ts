import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentModule } from 'src/environment/environment.module';
import { ITokenService } from './interfaces/token.service.interface';
import { TokenService } from './services/token.service';

@Module({
	imports: [EnvironmentModule, JwtModule],
	providers: [
		{
			provide: ITokenService,
			useClass: TokenService,
		},
	],
	exports: [ITokenService],
})
export class TokenModule {}
