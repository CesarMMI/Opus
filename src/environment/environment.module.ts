import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { IEnvironmentService } from './interfaces/environment.service.interface';
import { EnvironmentServiceImp } from './services/environment.service';

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: IEnvironmentService,
			useClass: EnvironmentServiceImp,
		},
	],
	exports: [IEnvironmentService],
})
export class EnvironmentModule {
	static forRoot(options?: ConfigModuleOptions<Record<string, any>>): DynamicModule {
		return {
			module: EnvironmentModule,
			imports: [ConfigModule.forRoot(options)],
		};
	}
}
