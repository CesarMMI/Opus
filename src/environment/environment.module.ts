import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { EnvironmentService } from './services/environment.service';

@Module({
	imports: [ConfigModule],
	providers: [EnvironmentService],
	exports: [EnvironmentService],
})
export class EnvironmentModule {
	static forRoot(options?: ConfigModuleOptions<Record<string, any>>): DynamicModule {
		return {
			module: EnvironmentModule,
			imports: [ConfigModule.forRoot(options)],
		};
	}
}
