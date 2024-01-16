export interface AuthResponse {
  token: string;
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
}
