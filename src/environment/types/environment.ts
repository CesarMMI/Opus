export type Environment = {
	database: EnvironmentDatabase;
	security: EnvironmentSecurity;
};

export type EnvironmentDatabase = {
	host: string;
	port: number;
	user: string;
	pass: string;
	database: string;
	sync: boolean;
};

export type EnvironmentSecurity = {
	passwordSalt: number;
	jwt: EnvironmentSecurityJwt;
};

export type EnvironmentSecurityJwt = {
	accessExp: string;
	refreshExp: string;
	accessSecret: string;
	refreshSecret: string;
};
