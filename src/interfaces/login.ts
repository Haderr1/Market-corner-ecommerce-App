export interface SuccessLoginResponseI {
  message: string;
  user: UserResponse;
  token: string;
}

export interface FailedLoginResponseI {
    statusMsg : string;
    message: string;
}

export interface UserResponse {
  name: string;
  email: string;
  role: string;
}