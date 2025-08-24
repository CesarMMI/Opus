import { EnvironmentDatabase } from './environment-database';
import { EnvironmentSecurity } from './environment-security';

export type Environment = {
	database: EnvironmentDatabase;
	security: EnvironmentSecurity;
};
