import { UserResponse } from "./login";

export interface SuccessSignupResponseI {
  message: string;
  user: UserResponse;
  token: string;
}

export interface ApiFieldError {
  value?: string;
  msg: string;
  param?: string;
  location?: string;
}

export interface FailedSignupResponseI {
  message: "fail";
  errors?: ApiFieldError[];
  statusMsg?: string;
}

