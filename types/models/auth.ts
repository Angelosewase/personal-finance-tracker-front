
export interface AuthToken {
  accessToken: string;
  tokenType: string;
}

export interface SigninRequest {
  usernameOrEmail: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface UsernameAvailabilityResponse {
  available: boolean;
}

export interface EmailAvailabilityResponse {
  available: boolean;
} 