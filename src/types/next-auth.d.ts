import type { UserResponse } from "@/interfaces";
import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";



declare module "next-auth" {
  
  interface Session extends DefaultSession {
    user: UserResponse;
  }
  interface User {
    user: UserResponse;
    token: string;
  }}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserResponse;
    token: string;
  }
}
