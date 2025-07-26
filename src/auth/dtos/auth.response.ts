export type AuthResponse = {
  tokens: AuthTokenResponse;
  user: AuthUserResponse;
};

export type AuthTokenResponse = {
  access: string;
  refresh: string;
};

export type AuthUserResponse = {
  id: string;
  name: string;
  email: string;
};
