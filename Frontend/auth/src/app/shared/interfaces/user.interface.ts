export interface User {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
