import { User } from '../../auth/types/user';

export type AuthResponse = {
  tokens?: { access?: string; refresh?: string };
  user?: User;
};
