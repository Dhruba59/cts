export interface RememberMeData {
  username: string;
  password: string;
  role: number;
}

export interface LoginPayload {
  username: string;
  password: string;
  role: number
}

export interface RefreshTokenPayload {
  refreshToken: string;
}