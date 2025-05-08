export interface UserBasic {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserProfile extends UserBasic {
  joinedAt: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  password?: string;
  address?: UserAddress;
  phone?: string;
  website?: string;
  company?: UserCompany;
}

export interface UpdateUserInfoRequest {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  lat?: string;
  lng?: string;
  phone?: string;
  website?: string;
  companyName?: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}