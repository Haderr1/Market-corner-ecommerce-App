import { UserResponse } from "./login";

export interface SuccessSignupResponseI {
  message: string;
  user: UserResponse;
  token: string;
}

export interface FailedSignupResponseI {
  statusMsg: string;
  message: string;
}

