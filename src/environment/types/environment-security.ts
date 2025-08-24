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
