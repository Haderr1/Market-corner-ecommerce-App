import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookie = (await cookies()).get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token: cookie,
    secret: process.env.AUTH_SECRET!,
  });

  return accessToken?.token;
}
