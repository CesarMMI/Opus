import { User } from './user';

export type AuthResponse = {
  tokens?: { access?: string; refresh?: string };
  user?: User;
};
