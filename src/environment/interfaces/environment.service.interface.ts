import { Environment } from '../types/environment';

export const IEnvironmentService = Symbol('IEnvironmentService');

export interface IEnvironmentService {
	get environment(): Environment;
}
